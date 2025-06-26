import React, { useState, useRef, useEffect } from 'react';
import { pipeline } from '@huggingface/transformers';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000, // 30 minutes
      cacheTime: 60 * 60 * 1000, // 1 hour
    },
  },
});

// Initialize the BitNet pipeline
async function initializePipeline() {
  try {
    const generator = await pipeline(
      'text-generation',
      'onnx-community/Llama-3.2-1B-Instruct-q4f16',
      { 
        device: 'webgpu',
        dtype: 'q4f16'
      }
    );
    return generator;
  } catch (error) {
    console.error('Failed to initialize pipeline:', error);
    throw error;
  }
}

// Generate response using the pipeline
async function generateResponse(pipeline, messages, prompt) {
  try {
    // Format the conversation for the model
    const conversation = messages.map(msg => 
      `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
    ).join('\n');
    
    const fullPrompt = `${conversation}\nHuman: ${prompt}\nAssistant:`;
    
    const result = await pipeline(fullPrompt, {
      max_new_tokens: 256+256,
      temperature: 0.7,
      do_sample: true,
      top_p: 0.9,
    });
    
    return result[0].generated_text.split('Assistant:').pop().trim();
  } catch (error) {
    console.error('Generation error:', error);
    throw error;
  }
}

function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m a BitNet-powered AI assistant. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  // Initialize the pipeline
  const { data: pipeline, isLoading: pipelineLoading, error: pipelineError } = useQuery({
    queryKey: ['bitnet-pipeline'],
    queryFn: initializePipeline,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Mutation for generating responses
  const generateMutation = useMutation({
    mutationFn: async ({ prompt }) => {
      if (!pipeline) throw new Error('Pipeline not initialized');
      return await generateResponse(pipeline, messages, prompt);
    },
    onSuccess: (response, { prompt, tempId }) => {
      setMessages(prev => prev.map(msg => 
        msg.id === tempId 
          ? { ...msg, content: response, isLoading: false }
          : msg
      ));
    },
    onError: (error, { tempId }) => {
      setMessages(prev => prev.map(msg => 
        msg.id === tempId 
          ? { ...msg, content: 'Sorry, I encountered an error generating a response.', isLoading: false }
          : msg
      ));
    },
  });

  const handleSendMessage = async (e) => {
    if (!inputMessage.trim() || !pipeline || generateMutation.isPending) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage.trim()
    };

    const tempAssistantMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '',
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, tempAssistantMessage]);
    const prompt = inputMessage.trim();
    setInputMessage('');

    generateMutation.mutate({ 
      prompt, 
      tempId: tempAssistantMessage.id 
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (pipelineLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading BitNet model...</p>
          <p className="text-sm ">This may take a moment on first load</p>
        </div>
      </div>
    );
  }

  if (pipelineError) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center text-red-600">
          <p className="text-lg mb-2">Failed to load BitNet model</p>
          <p className="text-sm">{pipelineError.message}</p>
          <button 
            onClick={() => queryClient.invalidateQueries(['bitnet-pipeline'])}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen ">
      {/* Header */}
      <div className=" shadow-sm border-b px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">BitNet Chat Assistant</h1>
        <p className="text-sm text-gray-600">Powered by WebGPU</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : '  shadow-sm border'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.role === 'assistant' && (
                  <Bot className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-500" />
                )}
                {message.role === 'user' && (
                  <User className="h-5 w-5 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  {message.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className=" border-t px-6 py-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder="Type your message..."
            disabled={generateMutation.isPending}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || generateMutation.isPending}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generateMutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatInterface />
    </QueryClientProvider>
  );
}