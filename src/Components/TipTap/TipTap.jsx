import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import './TipTap.css';

const TipTap = ({ content = '', onChange, placeholder = 'Start writing...' }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Ensure italic is enabled
                italic: {
                    HTMLAttributes: {
                        class: 'italic',
                    },
                },
                // Disable underline from StarterKit to avoid conflicts
                underline: false,
                // Configure paragraph to preserve line breaks
                paragraph: {
                    HTMLAttributes: {
                        class: 'paragraph',
                    },
                },
                // Configure hard breaks to preserve enters
                hardBreak: {
                    keepMarks: false,
                    HTMLAttributes: {
                        class: 'hard-break',
                    },
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            if (onChange) {
                // Get HTML with better formatting preservation
                const html = editor.getHTML();
                onChange(html);
            }
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
                'data-placeholder': placeholder,
            },
            // Handle paste events to preserve formatting
            handlePaste: (view, event, slice) => {
                return false; // Let TipTap handle it normally
            },
            // Preserve line breaks when transforming content
            transformPastedHTML: (html) => {
                // Convert line breaks to proper paragraphs
                return html.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
            },
        },
        // Parse options to better handle content
        parseOptions: {
            preserveWhitespace: 'full',
        },
    });

    // Update editor content when content prop changes
    React.useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            // Use setContent with parseOptions to preserve formatting
            editor.commands.setContent(content, false, {
                preserveWhitespace: 'full',
            });
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 sm:gap-2 p-2 sm:p-3 bg-gray-50 border-b border-gray-200 text-xs sm:text-sm">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r border-gray-300 pr-1 sm:pr-2 mr-1 sm:mr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border transition-colors ${
                            editor.isActive('bold')
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Toggle bold text"
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border transition-colors ${
                            editor.isActive('italic')
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Toggle italic text"
                    >
                        <em>I</em>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border transition-colors ${
                            editor.isActive('strike')
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Toggle strikethrough text"
                    >
                        <s>S</s>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border transition-colors ${
                            editor.isActive('code')
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Toggle inline code"
                    >
                        <code>&lt;/&gt;</code>
                    </button>
                </div>

                {/* Headings - Hidden on very small screens */}
                <div className="hidden sm:flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`px-3 py-1 rounded text-sm font-medium border transition-colors ${
                            editor.isActive('heading', { level: 1 })
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Heading 1"
                    >
                        H1
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`px-3 py-1 rounded text-sm font-medium border transition-colors ${
                            editor.isActive('heading', { level: 2 })
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Heading 2"
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`px-3 py-1 rounded text-sm font-medium border transition-colors ${
                            editor.isActive('heading', { level: 3 })
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Heading 3"
                    >
                        H3
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`px-3 py-1 rounded text-sm font-medium border transition-colors ${
                            editor.isActive('paragraph')
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Normal paragraph"
                    >
                        P
                    </button>
                </div>

                {/* Lists and Quotes */}
                <div className="flex gap-1 border-r border-gray-300 pr-1 sm:pr-2 mr-1 sm:mr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border transition-colors ${
                            editor.isActive('bulletList')
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Bullet list"
                    >
                        •
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border transition-colors ${
                            editor.isActive('orderedList')
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Numbered list"
                    >
                        1.
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border transition-colors ${
                            editor.isActive('blockquote')
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Block quote"
                    >
                        "
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border transition-colors ${
                            editor.isActive('codeBlock')
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                        title="Code block"
                    >
                        { }
                    </button>
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setHardBreak().run()}
                        className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border bg-white text-gray-700 hover:bg-gray-100 border-gray-300 transition-colors"
                        title="Insert line break (Shift+Enter)"
                    >
                        ↵
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border bg-white text-gray-700 hover:bg-gray-100 border-gray-300 transition-colors"
                        title="Horizontal line"
                    >
                        ―
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border bg-white text-gray-700 hover:bg-gray-100 border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Undo"
                    >
                        ↶
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border bg-white text-gray-700 hover:bg-gray-100 border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Redo"
                    >
                        ↷
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                        className="hidden sm:block px-3 py-1 rounded text-sm font-medium border bg-white text-gray-700 hover:bg-gray-100 border-gray-300 transition-colors"
                        title="Clear formatting"
                    >
                        Clear
                    </button>
                </div>
            </div>
            
            {/* Editor Content */}
            <div className="relative">
                <EditorContent 
                    editor={editor} 
                    className="min-h-[200px]"
                />
            </div>
        </div>
    );
};

export default TipTap;