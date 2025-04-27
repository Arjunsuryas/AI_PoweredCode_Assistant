import React, { useState } from 'react';
import { ArrowDown, Code2, Copy, Check } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Tabs from '../components/UI/Tabs';
import CodeEditor from '../components/CodeEditor/CodeEditor';
import CodeSuggestion from '../components/CodeEditor/CodeSuggestion';
import BugDetection from '../components/CodeEditor/BugDetection';
import LanguageSelector from '../components/CodeEditor/LanguageSelector';
import DocumentationGenerator from '../components/Documentation/DocumentationGenerator';
import ExampleSection from '../components/Examples/ExampleSection';
import FeatureSection from '../components/Dashboard/FeatureSection';
import ActionPanel from '../components/Dashboard/ActionPanel';
import { Language, CodeSuggestion as CodeSuggestionType, BugReport, DocumentationItem } from '../types';
import { exampleCode, mockSuggestions, mockBugs, mockDocumentation } from '../utils/exampleData';

const Home: React.FC = () => {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(exampleCode[language]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('code');
  const [suggestions, setSuggestions] = useState<CodeSuggestionType[]>([]);
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [documentation, setDocumentation] = useState<DocumentationItem[]>([]);
  const [copied, setCopied] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCode(exampleCode[newLanguage]);
  };

  const optimizeCode = () => {
    setLoading(true);
    setTimeout(() => {
      setSuggestions(mockSuggestions);
      setActiveTab('suggestions');
      setLoading(false);
    }, 1500);
  };

  const detectBugs = () => {
    setLoading(true);
    setTimeout(() => {
      setBugs(mockBugs);
      setActiveTab('bugs');
      setLoading(false);
    }, 1500);
  };

  const generateDocumentation = () => {
    setLoading(true);
    setTimeout(() => {
      setDocumentation(mockDocumentation);
      setActiveTab('documentation');
      setLoading(false);
    }, 1500);
  };

  const showExamples = () => {
    setActiveTab('examples');
  };

  const handleAcceptSuggestion = (suggestion: CodeSuggestionType) => {
    setCode(suggestion.suggestion);
    setSuggestions(suggestions.filter(s => s.id !== suggestion.id));
  };

  const handleRejectSuggestion = (suggestion: CodeSuggestionType) => {
    setSuggestions(suggestions.filter(s => s.id !== suggestion.id));
  };

  const handleFeedback = (suggestion: CodeSuggestionType, isHelpful: boolean) => {
    console.log('Feedback provided:', { suggestion, isHelpful });
  };

  const handleFixBug = (bug: BugReport) => {
    console.log('Applying bug fix:', bug);
    setBugs(bugs.filter(b => b.id !== bug.id));
  };

  const handleCopyDocumentation = (documentation: DocumentationItem) => {
    navigator.clipboard.writeText(documentation.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    {
      id: 'code',
      label: 'Editor',
      content: (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <LanguageSelector
              selectedLanguage={language}
              onChange={handleLanguageChange}
            />
            <Button
              variant="outline"
              icon={copied ? Check : Copy}
              onClick={handleCopyCode}
              className="text-sm"
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </Button>
          </div>
          <CodeEditor
            language={language}
            code={code}
            onChange={setCode}
          />
        </div>
      ),
    },
    {
      id: 'suggestions',
      label: 'Suggestions',
      content: (
        <div className="space-y-4">
          {suggestions.length > 0 ? (
            suggestions.map(suggestion => (
              <CodeSuggestion
                key={suggestion.id}
                suggestion={suggestion}
                onAccept={handleAcceptSuggestion}
                onReject={handleRejectSuggestion}
                onFeedback={handleFeedback}
              />
            ))
          ) : (
            <Card className="text-center py-8">
              <div className="text-gray-500 dark:text-gray-400">
                <Code2 size={24} className="mx-auto mb-2" />
                <p>No suggestions yet. Optimize your code to get started.</p>
                <Button
                  variant="primary"
                  onClick={optimizeCode}
                  isLoading={loading}
                  className="mt-4"
                >
                  Optimize Code
                </Button>
              </div>
            </Card>
          )}
        </div>
      ),
    },
    {
      id: 'bugs',
      label: 'Bugs',
      content: (
        <BugDetection bugs={bugs} onFixBug={handleFixBug} />
      ),
    },
    {
      id: 'documentation',
      label: 'Documentation',
      content: (
        <DocumentationGenerator
          documentation={documentation}
          onCopyDocumentation={handleCopyDocumentation}
        />
      ),
    },
    {
      id: 'examples',
      label: 'Examples',
      content: <ExampleSection />,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          AI-Powered Code Assistant
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Optimize your code, fix bugs, and generate documentation with the power of AI
        </p>
      </div>

      <FeatureSection />

      <div className="pt-6">
        <ActionPanel
          onOptimizeCode={optimizeCode}
          onDetectBugs={detectBugs}
          onGenerateDocumentation={generateDocumentation}
          onShowExamples={showExamples}
          loading={loading}
        />
      </div>

      <div className="bg-white dark:bg-dark-400 rounded-lg shadow-sm border border-gray-100 dark:border-dark-300 overflow-hidden">
        <Tabs tabs={tabs} defaultTab={activeTab} />
      </div>

      <div className="text-center py-4">
        <Button
          variant="ghost"
          className="text-gray-500 dark:text-gray-400 animate-pulse-slow"
          icon={ArrowDown}
        >
          Scroll for more inspiration
        </Button>
      </div>
    </div>
  );
};

export default Home;
