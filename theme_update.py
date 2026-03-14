import os
import glob

def apply_theme():
    files = glob.glob('frontend/**/*.tsx', recursive=True)
    for f in files:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Inject Glassmorphism overriding solid slate backgrounds
        new_content = content.replace('dark:bg-slate-900', 'dark:bg-slate-900/40 backdrop-blur-xl')
        new_content = new_content.replace('bg-white dark:bg-slate-900/40', 'bg-white/90 dark:bg-slate-900/40')
        new_content = new_content.replace('dark:bg-slate-950', 'dark:bg-transparent')
        new_content = new_content.replace('bg-slate-50 dark:bg-transparent', 'bg-slate-50/50 dark:bg-transparent')
        
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Updated {f}")

if __name__ == '__main__':
    apply_theme()
