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
                terminal: {
                    DEFAULT: '#00ff41',
                    dark: '#00cc33',
                    light: '#66ff88'
                },
                panic: {
                    DEFAULT: '#ff0055',
                    dark: '#cc0044',
                    light: '#ff3377'
                },
                cyber: {
                    DEFAULT: '#00ccff',
                    dark: '#0099cc',
                    light: '#33ddff'
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
                        boxShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41',
                        textShadow: '0 0 5px #00ff41'
                    },
                    '50%': {
                        boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
                        textShadow: '0 0 10px #00ff41'
                    }
                },
                'pulse-glow': {
                    '0%, 100%': {
                        opacity: '1',
                        filter: 'drop-shadow(0 0 5px #00ff41)'
                    },
                    '50%': {
                        opacity: '0.7',
                        filter: 'drop-shadow(0 0 15px #00ff41)'
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
                'grid': 'linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px), linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px)',
                'radar': 'radial-gradient(circle, rgba(0,255,65,0.1) 0%, transparent 70%)'
            },
            backgroundSize: {
                'grid': '20px 20px'
            }
        }
    },
    plugins: []
};
