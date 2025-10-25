from dataclasses import dataclass
from typing import Literal, Optional

# Define the Language type
Language = Literal['javascript', 'typescript', 'python', 'java', 'csharp', 'go']

@dataclass
class CodeSuggestion:
    id: str
    original: str
    suggestion: str
    explanation: str

@dataclass
class BugReport:
    id: str
    line: int
    severity: Literal['error', 'warning', 'info']
    message: str
    fix: str

@dataclass
class DocumentationItem:
    id: str
    type: Literal['docstring', 'comment', 'readme']
    content: str

@dataclass
class Example:
    id: str
    title: str
    language: Language
    description: str
    code: str
    optimizedCode: str
    documentation: str

@dataclass
class FeedbackItem:
    id: str
    suggestionId: str
    helpful: bool
    comments: Optional[str] = None
