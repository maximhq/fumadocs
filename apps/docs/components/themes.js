const full_layout = `
.nd-container { max-width: none; }
main aside { border-right-width: 1px; }
article { margin-left: auto; margin-right: auto; max-width: 700px; }`

const blue_theme = `:root { --background: 0 0% 100%; --foreground: 222.2 47.4%
11.2%; --muted: 210 40% 96.1%; --muted-foreground: 215.4 16.3% 46.9%; --popover:
0 0% 100%; --popover-foreground: 222.2 47.4% 11.2%; --card: 210 40% 98%;
--card-foreground: 222.2 47.4% 11.2%; --border: 214.3 31.8% 91.4%; --input:
214.3 31.8% 91.4%; --primary: 222.2 47.4% 11.2%; --primary-foreground: 210 40%
98%; --secondary: 210 40% 96.1%; --secondary-foreground: 222.2 47.4% 11.2%;
--accent: 210 40% 96.1%; --accent-foreground: 222.2 47.4% 11.2%; --destructive:
0 100% 50%; --destructive-foreground: 210 40% 98%; --ring: 215 20.2% 65.1%; }

.dark { --background: 224 71% 4%; --foreground: 213 31% 91%; --muted: 223 47%
11%; --muted-foreground: 215.4 16.3% 56.9%; --popover: 224 47.4% 6%;
--popover-foreground: 215 20.2% 65.1%; --card: 216 71% 6%; --card-foreground:
213 31% 91%; --border: 216 34% 17%; --input: 216 34% 17%; --primary: 210 40%
98%; --primary-foreground: 222.2 47.4% 1.2%; --secondary: 222.2 47.4% 11.2%;
--secondary-foreground: 210 40% 98%; --accent: 216 34% 14%; --accent-foreground:
210 40% 98%; --destructive: 0 63% 31%; --destructive-foreground: 210 40% 98%;
--ring: 216 34% 17%; }`

export { full_layout, blue_theme }
