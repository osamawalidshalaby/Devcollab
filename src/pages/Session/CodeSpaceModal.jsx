import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { 
  X, 
  Play, 
  Save, 
  Download, 
  Upload, 
  Copy, 
  Settings, 
  FolderOpen,
  File,
  Plus,
  Code,
  Terminal,
  CheckCircle
} from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CodeSpaceContainer = styled.div`
  width: 95vw;
  height: 90vh;
  max-width: 1400px;
  background: #1e1e1e;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid #333;

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2d2d30;
  padding: 12px 16px;
  border-bottom: 1px solid #333;
  min-height: 48px;

  @media (max-width: 768px) {
    padding: 8px 12px;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const TaskTitle = styled.h3`
  color: #cccccc;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TaskBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch(props.$priority) {
      case 'high': return 'rgba(239, 68, 68, 0.2)';
      case 'medium': return 'rgba(245, 158, 11, 0.2)';
      default: return 'rgba(16, 185, 129, 0.2)';
    }
  }};
  color: ${props => {
    switch(props.$priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      default: return '#10b981';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      default: return '#10b981';
    }
  }};
  white-space: nowrap;

  @media (max-width: 480px) {
    display: none;
  }
`;

const TitleBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #cccccc;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &.primary {
    background: #0e639c;
    color: white;
    
    &:hover {
      background: #1177bb;
    }
  }

  &.success {
    background: #16a085;
    
    &:hover {
      background: #1abc9c;
    }
  }

  @media (max-width: 768px) {
    padding: 6px;
    font-size: 12px;
    
    span {
      display: none;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #cccccc;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 8px;
  
  &:hover {
    background: #e74c3c;
    color: white;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #252526;
  border-right: 1px solid #333;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 60px;
  }

  @media (max-width: 480px) {
    display: ${props => props.$hidden ? 'none' : 'flex'};
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 200px;
  }
`;

const SidebarHeader = styled.div`
  padding: 12px 16px;
  background: #2d2d30;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
`;

const SidebarTitle = styled.h4`
  color: #cccccc;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FileList = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #252526;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #464647;
    border-radius: 3px;
  }
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  color: #cccccc;
  font-size: 14px;
  transition: all 0.2s ease;
  background: ${props => props.$active ? 'rgba(14, 99, 156, 0.3)' : 'transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    justify-content: center;
    
    span {
      display: none;
    }
  }
`;

const CodeArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const EditorTabs = styled.div`
  display: flex;
  background: #2d2d30;
  border-bottom: 1px solid #333;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #2d2d30;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #464647;
    border-radius: 2px;
  }
`;

const EditorTab = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${props => props.$active ? '#1e1e1e' : '#2d2d30'};
  color: ${props => props.$active ? '#ffffff' : '#cccccc'};
  cursor: pointer;
  border-right: 1px solid #333;
  font-size: 14px;
  white-space: nowrap;
  min-width: 120px;
  
  &:hover {
    background: ${props => props.$active ? '#1e1e1e' : 'rgba(255, 255, 255, 0.1)'};
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    min-width: 100px;
    font-size: 12px;
  }
`;

const TabCloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  padding: 2px;
  border-radius: 2px;
  cursor: pointer;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CodeEditor = styled.textarea`
  flex: 1;
  background: #1e1e1e;
  color: #d4d4d4;
  border: none;
  outline: none;
  padding: 20px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
  
  &::placeholder {
    color: #6a9955;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 12px;
  }
`;

const StatusBar = styled.div`
  background: #007acc;
  color: white;
  padding: 6px 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 4px 12px;
    font-size: 11px;
  }
`;

const StatusLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const StatusRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const MobileSidebarToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: #cccccc;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  
  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CodeSpaceModal = ({ isOpen, onClose, task }) => {
  const [files, setFiles] = useState([
    { 
      id: 1, 
      name: 'main.js', 
      type: 'javascript', 
      content: '// Task: ' + (task?.title || 'New Task') + '\n// Priority: ' + (task?.priority || 'medium') + '\n\nconsole.log("Hello World!");', 
      active: true 
    },
    { 
      id: 2, 
      name: 'styles.css', 
      type: 'css', 
      content: '/* Styles for ' + (task?.title || 'New Task') + ' */\nbody {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n}', 
      active: false 
    },
    { 
      id: 3, 
      name: 'index.html', 
      type: 'html', 
      content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>' + (task?.title || 'New Task') + '</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Task Implementation</h1>\n  <script src="main.js"></script>\n</body>\n</html>', 
      active: false 
    }
  ]);
  
  const [activeFile, setActiveFile] = useState(1);
  const [isSaved, setIsSaved] = useState(true);
  const [sidebarHidden, setSidebarHidden] = useState(true);
  const editorRef = useRef(null);

  const currentFile = files.find(f => f.id === activeFile);

  useEffect(() => {
    if (isOpen && task) {
      // Update the initial content when a new task is loaded
      setFiles(prev => prev.map(file => 
        file.id === 1 
          ? { ...file, content: `// Task: ${task.title}\n// Priority: ${task.priority}\n// Status: ${task.status}\n// Description: ${task.description || 'No description'}\n\n// Start coding here...\nconsole.log("Starting task: ${task.title}");` }
          : file.id === 2
          ? { ...file, content: `/* Styles for ${task.title} */\n/* Priority: ${task.priority} */\n\nbody {\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background-color: #f5f5f5;\n}\n\n.container {\n  max-width: 800px;\n  margin: 0 auto;\n  background: white;\n  padding: 2rem;\n  border-radius: 8px;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n}` }
          : file.id === 3
          ? { ...file, content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${task.title}</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <div class="container">\n    <h1>${task.title}</h1>\n    <p><strong>Priority:</strong> ${task.priority}</p>\n    <p><strong>Status:</strong> ${task.status}</p>\n    <p>${task.description || 'Task implementation goes here...'}</p>\n  </div>\n  <script src="main.js"></script>\n</body>\n</html>` }
          : file
      ));
      setIsSaved(true);
    }
  }, [isOpen, task]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 480 && !sidebarHidden) {
        const sidebar = event.target.closest('[data-sidebar]');
        const toggle = event.target.closest('[data-sidebar-toggle]');
        if (!sidebar && !toggle) {
          setSidebarHidden(true);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarHidden]);

  const handleFileSelect = (fileId) => {
    setActiveFile(fileId);
    setFiles(prev => prev.map(f => ({ ...f, active: f.id === fileId })));
    setSidebarHidden(true); // Hide sidebar on mobile after selection
  };

  const handleCodeChange = (e) => {
    const newContent = e.target.value;
    setFiles(prev => prev.map(f => 
      f.id === activeFile ? { ...f, content: newContent } : f
    ));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    // Here you would implement actual save functionality
    console.log('Saving files:', files);
    // Show success message or integrate with your backend
  };

  const handleRun = () => {
    if (currentFile?.type === 'javascript') {
      try {
        // Create a safe evaluation context
        const consoleOutput = [];
        const mockConsole = {
          log: (...args) => {
            consoleOutput.push(args.join(' '));
          }
        };
        
        // Simple evaluation for demo purposes
        // In production, you'd want to use a proper sandbox
        const func = new Function('console', currentFile.content);
        func(mockConsole);
        
        if (consoleOutput.length > 0) {
          alert('Console Output:\n' + consoleOutput.join('\n'));
        } else {
          alert('Code executed successfully! (No console output)');
        }
      } catch (error) {
        alert('Error running code: ' + error.message);
      }
    } else {
      alert('Run functionality is currently only available for JavaScript files.');
    }
  };

  const addNewFile = () => {
    const fileName = prompt('Enter file name (e.g., script.js, style.css, page.html):');
    if (fileName && fileName.trim()) {
      const fileType = fileName.split('.').pop()?.toLowerCase() || 'txt';
      const newFile = {
        id: Date.now(),
        name: fileName.trim(),
        type: fileType,
        content: getDefaultContent(fileType, task),
        active: false
      };
      setFiles(prev => [...prev, newFile]);
      setIsSaved(false);
    }
  };

  const getDefaultContent = (type, taskInfo) => {
    const taskTitle = taskInfo?.title || 'New Task';
    switch (type) {
      case 'js':
      case 'javascript':
        return `// ${taskTitle} - JavaScript\n// Created: ${new Date().toLocaleDateString()}\n\nconsole.log("Hello from ${taskTitle}!");`;
      case 'css':
        return `/* ${taskTitle} - Styles */\n/* Created: ${new Date().toLocaleDateString()} */\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: Arial, sans-serif;\n}`;
      case 'html':
        return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${taskTitle}</title>\n</head>\n<body>\n  <h1>${taskTitle}</h1>\n  <p>Created: ${new Date().toLocaleDateString()}</p>\n</body>\n</html>`;
      case 'json':
        return `{\n  "name": "${taskTitle}",\n  "version": "1.0.0",\n  "description": "Configuration for ${taskTitle}"\n}`;
      default:
        return `# ${taskTitle}\nCreated: ${new Date().toLocaleDateString()}\n\nFile content goes here...`;
    }
  };

  const closeFile = (fileId, e) => {
    e.stopPropagation();
    if (files.length <= 1) {
      alert('Cannot close the last remaining file.');
      return;
    }
    
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFile === fileId) {
      const remainingFiles = files.filter(f => f.id !== fileId);
      if (remainingFiles.length > 0) {
        setActiveFile(remainingFiles[0].id);
      }
    }
    setIsSaved(false);
  };

  const copyToClipboard = () => {
    if (currentFile?.content) {
      navigator.clipboard.writeText(currentFile.content).then(() => {
        alert('Code copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy to clipboard.');
      });
    }
  };

  const downloadFile = () => {
    if (currentFile) {
      const blob = new Blob([currentFile.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <CodeSpaceContainer>
        <TitleBar>
          <TaskInfo>
            <MobileSidebarToggle 
              onClick={() => setSidebarHidden(!sidebarHidden)}
              data-sidebar-toggle
            >
              <FolderOpen size={16} />
            </MobileSidebarToggle>
            <Code size={20} />
            <TaskTitle>{task?.title || 'Code Space'}</TaskTitle>
            <TaskBadge $priority={task?.priority}>{task?.priority} priority</TaskBadge>
          </TaskInfo>
          
          <TitleBarActions>
            <ActionButton className="success" onClick={handleSave} title="Save All">
              {isSaved ? <CheckCircle size={16} /> : <Save size={16} />}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </ActionButton>
            <ActionButton className="primary" onClick={handleRun} title="Run Code">
              <Play size={16} />
              <span>Run</span>
            </ActionButton>
            <ActionButton onClick={copyToClipboard} title="Copy Code">
              <Copy size={16} />
              <span>Copy</span>
            </ActionButton>
            <ActionButton onClick={downloadFile} title="Download File">
              <Download size={16} />
              <span>Download</span>
            </ActionButton>
            <CloseButton onClick={onClose} title="Close">
              <X size={16} />
            </CloseButton>
          </TitleBarActions>
        </TitleBar>

        <MainContent>
          <Sidebar $hidden={sidebarHidden} data-sidebar>
            <SidebarHeader>
              <SidebarTitle>Files</SidebarTitle>
              <ActionButton onClick={addNewFile} title="New File">
                <Plus size={16} />
              </ActionButton>
            </SidebarHeader>
            
            <FileList>
              {files.map(file => (
                <FileItem
                  key={file.id}
                  $active={file.id === activeFile}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <File size={16} />
                  <span>{file.name}</span>
                </FileItem>
              ))}
            </FileList>
          </Sidebar>

          <CodeArea>
            <EditorTabs>
              {files.map(file => (
                <EditorTab
                  key={file.id}
                  $active={file.id === activeFile}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <File size={14} />
                  <span>{file.name}</span>
                  {files.length > 1 && (
                    <TabCloseButton 
                      onClick={(e) => closeFile(file.id, e)}
                      title="Close file"
                    >
                      <X size={12} />
                    </TabCloseButton>
                  )}
                </EditorTab>
              ))}
            </EditorTabs>

            <CodeEditor
              ref={editorRef}
              value={currentFile?.content || ''}
              onChange={handleCodeChange}
              placeholder={`// Start coding for ${task?.title || 'your task'}...\n// This is a ${currentFile?.type || 'text'} file`}
              spellCheck={false}
            />
          </CodeArea>
        </MainContent>

        <StatusBar>
          <StatusLeft>
            <span>Task: {task?.title}</span>
            <span>Language: {currentFile?.type || 'plain'}</span>
            <span>File: {currentFile?.name}</span>
          </StatusLeft>
          <StatusRight>
            <span>Lines: {currentFile?.content?.split('\n').length || 0}</span>
            <span>Characters: {currentFile?.content?.length || 0}</span>
            <span>{isSaved ? 'All changes saved' : 'Unsaved changes'}</span>
          </StatusRight>
        </StatusBar>
      </CodeSpaceContainer>
    </ModalOverlay>
  );
};

export default CodeSpaceModal;