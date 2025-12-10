/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                void: '#0a0a0a',
                // Stranger Things Theme Colors
                gate: {
                    DEFAULT: '#8B0000',  // Upside Down Red
                    dark: '#660000',
                    light: '#B22222'
                },
                mindflayer: {
                    DEFAULT: '#6A0DAD',  // Deep Purple
                    dark: '#4B0082',
                    light: '#8B00FF'
                },
                eleven: {
                    DEFAULT: '#FF69B4',  // Hot Pink
                    dark: '#FF1493',
                    light: '#FFB6C1'
                },
                hawkins: {
                    DEFAULT: '#1E3A8A',  // Dark Blue
                    dark: '#1E293B',
                    light: '#3B82F6'
                },
                upside: {
                    DEFAULT: '#4A2511',  // Demogorgon Brown
                    dark: '#2C1810',
                    light: '#6B4423'
                },
                // Keep legacy colors for compatibility
                terminal: {
                    DEFAULT: '#8B0000',  // Map to gate red
                    dark: '#660000',
                    light: '#B22222'
                },
                panic: {
                    DEFAULT: '#8B0000',  // Map to gate red
                    dark: '#660000',
                    light: '#B22222'
                },
                cyber: {
                    DEFAULT: '#6A0DAD',  // Map to mindflayer purple
                    dark: '#4B0082',
                    light: '#8B00FF'
                }
            },
            fontFamily: {
                mono: ['"Space Mono"', 'monospace']
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
                'glitch': 'glitch 0.5s infinite'
            },
            keyframes: {
                glow: {
                    '0%, 100%': {
                        boxShadow: '0 0 5px #8B0000, 0 0 10px #8B0000, 0 0 15px #8B0000',
                        textShadow: '0 0 5px #8B0000'
                    },
                    '50%': {
                        boxShadow: '0 0 10px #B22222, 0 0 20px #B22222, 0 0 30px #8B0000',
                        textShadow: '0 0 10px #8B0000'
                    }
                },
                'pulse-glow': {
                    '0%, 100%': {
                        opacity: '1',
                        filter: 'drop-shadow(0 0 5px #8B0000)'
                    },
                    '50%': {
                        opacity: '0.7',
                        filter: 'drop-shadow(0 0 15px #B22222)'
                    }
                },
                glitch: {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                    '100%': { transform: 'translate(0)' }
                }
            },
            backgroundImage: {
                'grid': 'linear-gradient(90deg, rgba(139,0,0,0.1) 1px, transparent 1px), linear-gradient(rgba(139,0,0,0.1) 1px, transparent 1px)',
                'radar': 'radial-gradient(circle, rgba(139,0,0,0.15) 0%, transparent 70%)'
            },
            backgroundSize: {
                'grid': '20px 20px'
            }
        }
    },
    plugins: []
};
