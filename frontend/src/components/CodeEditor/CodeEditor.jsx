import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { validateCode } from '../../utils/codeValidators';

const CodeEditor = ({ onSubmit, phase, disabled = false }) => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [feedback, setFeedback] = useState(null);
    const [isValidating, setIsValidating] = useState(false);

    const languages = [
        { value: 'python', label: 'Python' },
        { value: 'c', label: 'C' },
        { value: 'cpp', label: 'C++' },
        { value: 'java', label: 'Java' },
        { value: 'javascript', label: 'JavaScript' }
    ];

    const editorOptions = {
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 4,
        wordWrap: 'on',
        theme: 'vs-dark',
        padding: { top: 10, bottom: 10 }
    };

    const getStarterCode = (lang, phaseNum) => {
        const starters = {
            python: {
                1: `# Dijkstra's Algorithm\n# Find the shortest path from Home to Store\n\n`,
                2: `# DFS Traversal\n# Navigate the store to find Dry Rations\n\n`,
                3: `# Sorting Algorithm\n# Sort products by priority (use any algorithm)\n\n`,
                4: `# Binary Search\n# Find "Maggi" in the shelves\n\n`
            },
            javascript: {
                1: `// Dijkstra's Algorithm\n// Find the shortest path from Home to Store\n\n`,
                2: `// DFS Traversal\n// Navigate the store to find Dry Rations\n\n`,
                3: `// Sorting Algorithm\n// Sort products by priority (use any algorithm)\n\n`,
                4: `// Binary Search\n// Find "Maggi" in the shelves\n\n`
            },
            c: {
                1: `// Dijkstra's Algorithm\n// Find the shortest path from Home to Store\n\n`,
                2: `// DFS Traversal\n// Navigate the store to find Dry Rations\n\n`,
                3: `// Sorting Algorithm\n// Sort products by priority (use any algorithm)\n\n`,
                4: `// Binary Search\n// Find "Maggi" in the shelves\n\n`
            },
            cpp: {
                1: `// Dijkstra's Algorithm\n// Find the shortest path from Home to Store\n\n`,
                2: `// DFS Traversal\n// Navigate the store to find Dry Rations\n\n`,
                3: `// Sorting Algorithm\n// Sort products by priority (use any algorithm)\n\n`,
                4: `// Binary Search\n// Find "Maggi" in the shelves\n\n`
            },
            java: {
                1: `// Dijkstra's Algorithm\n// Find the shortest path from Home to Store\n\n`,
                2: `// DFS Traversal\n// Navigate the store to find Dry Rations\n\n`,
                3: `// Sorting Algorithm\n// Sort products by priority (use any algorithm)\n\n`,
                4: `// Binary Search\n// Find "Maggi" in the shelves\n\n`
            }
        };

        return starters[lang]?.[phaseNum] || `// Write your ${getPhaseAlgorithm(phaseNum)} implementation\n`;
    };

    const getPhaseAlgorithm = (phaseNum) => {
        const algorithms = {
            1: 'Dijkstra\'s Algorithm',
            2: 'DFS',
            3: 'Sorting Algorithm',
            4: 'Binary Search'
        };
        return algorithms[phaseNum] || 'Algorithm';
    };

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        setCode(getStarterCode(newLang, phase));
        setFeedback(null);
    };

    const handleEditorMount = (editor) => {
        setCode(getStarterCode(language, phase));
    };

    const handleSubmit = async () => {
        setIsValidating(true);
        setFeedback(null);

        // Client-side validation
        const validation = validateCode(code, phase, language);

        if (validation.valid) {
            setFeedback({ type: 'success', message: validation.feedback });

            // Call parent's onSubmit
            if (onSubmit) {
                await onSubmit(code, language);
            }
        } else {
            setFeedback({ type: 'error', message: validation.feedback });
        }

        setIsValidating(false);
    };

    return (
        <div className="w-full h-full flex flex-col bg-void border-2 border-terminal p-4" style={{ boxShadow: '0 0 20px rgba(0, 255, 102, 0.3)' }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-terminal text-xl font-bold">
                    CODE EDITOR
                </h3>

                {/* Language Selector */}
                <div className="flex gap-2">
                    {languages.map((lang) => (
                        <button
                            key={lang.value}
                            onClick={() => handleLanguageChange(lang.value)}
                            disabled={disabled}
                            className={`
                                px-3 py-1 text-sm font-bold transition-all
                                ${language === lang.value
                                    ? 'bg-terminal text-void border-2 border-terminal'
                                    : 'bg-void text-terminal border-2 border-terminal hover:bg-terminal hover:text-void'
                                }
                                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            `}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 border-2 border-terminal mb-4 overflow-hidden">
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    onMount={handleEditorMount}
                    options={editorOptions}
                    theme="vs-dark"
                />
            </div>

            {/* Feedback */}
            {feedback && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                        mb-4 p-3 border-2 font-bold
                        ${feedback.type === 'success'
                            ? 'bg-terminal bg-opacity-20 border-terminal text-terminal'
                            : 'bg-panic bg-opacity-20 border-panic text-panic'
                        }
                    `}
                >
                    {feedback.message}
                </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
                whileHover={{ scale: disabled ? 1 : 1.02 }}
                whileTap={{ scale: disabled ? 1 : 0.98 }}
                onClick={handleSubmit}
                disabled={disabled || isValidating}
                className={`
                    w-full py-3 text-lg font-bold transition-all
                    ${disabled || isValidating
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-terminal text-void hover:bg-opacity-90 cursor-pointer'
                    }
                    border-2 border-terminal
                `}
            >
                {isValidating ? 'VALIDATING...' : disabled ? 'CODE VALIDATED ✓' : 'SUBMIT CODE'}
            </motion.button>
        </div>
    );
};

export default CodeEditor;
