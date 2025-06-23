import { useState } from 'react';
import { categories } from '../data/categories';

export interface AIAnalysisResult {
  title: string;
  category: string;
  subcategory: string;
  condition: string;
  tags: string[];
  description: string;
  confidence: number;
}

interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  location: string;
  condition: string;
  negotiable: boolean;
  featured?: boolean;
}

interface UseAIProductAnalysisProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setSelectedCategory?: (category: string) => void;
  setSubcategories?: (subcategories: string[]) => void;
}

export const useAIProductAnalysis = ({ 
  formData, 
  setFormData, 
  setSelectedCategory, 
  setSubcategories 
}: UseAIProductAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AIAnalysisResult | null>(null);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImageWithAI = async (imageUrl: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image');
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        setAiSuggestions(result.data);
        setShowAiSuggestions(true);
      } else {
        throw new Error('Invalid response from AI service');
      }
    } catch (err) {
      console.error('AI analysis error:', err);
      setError(`AI analysis failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyAISuggestions = () => {
    if (!aiSuggestions) return;

    // Find the category ID that matches the AI suggestion
    const matchedCategory = categories.find(cat => 
      cat.id === aiSuggestions.category || 
      cat.name.toLowerCase() === aiSuggestions.category.toLowerCase()
    );

    if (matchedCategory) {
      setFormData(prev => ({
        ...prev,
        title: aiSuggestions.title,
        description: aiSuggestions.description,
        category: matchedCategory.id,
        subcategory: aiSuggestions.subcategory,
        condition: aiSuggestions.condition
      }));

      // Update category-related states if provided
      if (setSelectedCategory) {
        setSelectedCategory(matchedCategory.id);
      }
      if (setSubcategories) {
        setSubcategories(matchedCategory.subcategories || []);
      }
    }

    setShowAiSuggestions(false);
    setAiSuggestions(null);
  };

  const dismissAISuggestions = () => {
    setShowAiSuggestions(false);
    setAiSuggestions(null);
  };

  return {
    isAnalyzing,
    aiSuggestions,
    showAiSuggestions,
    error,
    analyzeImageWithAI,
    applyAISuggestions,
    dismissAISuggestions,
    setError
  };
};