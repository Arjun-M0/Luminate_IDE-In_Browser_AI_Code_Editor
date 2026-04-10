"use client";
import React , {useRef , useEffect , useCallback} from 'react'
import Editor , {type Monaco } from "@monaco-editor/react";
import {TemplateFile} from "../lib/path-to-json";
import { configureMonaco , defaultEditorOptions , getEditorLanguage } from '../lib/editor-config';

interface PlaygroundEditorProps {
  activeFile: TemplateFile | undefined
  content:string
  onContentChange:(value:string) => void
  suggestion: string | null
  suggestionPosition: { line: number; column: number } | null
  suggestionLoading: boolean
  onAcceptSuggestion: (editor: any, monaco: any) => void
  onRejectSuggestion: (editor: any) => void
  onTriggerSuggestion: (type : string , editor: any) => void
}

const PlaygroundEditor = ({ activeFile, content, onContentChange , suggestion, suggestionPosition, suggestionLoading, onAcceptSuggestion, onRejectSuggestion, onTriggerSuggestion }: PlaygroundEditorProps) => {
    const editorRef = useRef<any>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const inlineCompletionProviderRef = useRef<any>(null);
    const currentSuggestionRef = useRef<{text: string, position: { line: number; column: number } , id:string} | null>(null);
    const isAcceptingSuggestionRef = useRef(false);
    const suggestionAcceptedRef = useRef(false);
    const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const tabCommandRef = useRef<any>(null)

    

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        configureMonaco(monaco);
        updateEditorLanguage();
    }

    const updateEditorLanguage = ()=>{
      if(!activeFile || !monacoRef.current || !editorRef.current) return;
      const model = editorRef.current.getModel();
      if(!model) return;
      const language = getEditorLanguage(activeFile.fileExtension || "");
      try{
        monacoRef.current.editor.setModelLanguage(model, language);
      }catch(e){
        console.error("Failed to set editor language:", e);
      }
    }

    useEffect(()=>{
      updateEditorLanguage();
    },[activeFile])

    return <div className='h-full relative'>
      <Editor 
      height="100%" 
      value={content}
      onChange ={(value)=> onContentChange(value || "")}
      onMount={handleEditorDidMount}
      language={activeFile ? getEditorLanguage(activeFile.fileExtension || "") : "plaintext"}
      //@ts-ignore
      options={defaultEditorOptions}
      />
    </div>
}

export default PlaygroundEditor
