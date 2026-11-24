<!--
Author: Sid
Modification date: 2026-11-25 00:44:46 +05:30
-->
Learning github copilot

Ai powered coding assistant for dev help like debug, write and understand
it provides the features like
1. code completion
2. agent mode(update/create the files based on ur query)
3. plan (plan the task steps to complete)


It has different modes like 
1. agent: updates the files and runs the scripts and creates the files
2. ask: answers the query
3. plan: plans the steps to be done for the task completion
4. code completion: based on the context/comment/tab opnend it suggest the next snippet

Among these modes it will provide some of the tools enabled by default based on that u will get the response or edits u can modify them by adding or removing the tool but it will be for that session only
ex:
    ask won't have the edit tool and agent will have it 


When u r working with the UI changes there is extra feature from the github copilot qith integrated browser of the vscode it does gives u options like 
C:\Users\Sid\Learning\Github Copliot\overview\UIInetgratedBroserContext.png

1. add a element to chat: u can add the element by clicking and ask for modify 
2. comment on element: u can select a element and add a comment as a modification instruction and it does the changes
3. add console logs to chat: checks the console of the ui and if any errors it fixes them
4. add a screenshot to chat: u can add whole page as a screenshot for the context
5. add area screenshot to the chat: u can select perticular area as a screenshot for the context




Overview
Feature	What it does
Prompts	Gives Copilot a task
Instructions	Tells Copilot how it should behave
Skills	Provides reusable knowledge and workflows
Hooks	Executes scripts automatically at specific events
Tools	Allows Copilot to perform operations
MCP	Connects Copilot to external systems and services


How to use the instructions in copilot:(Rule book)
Instructions are custom guidelines that tell GitHub Copilot how to understand, write, modify, and maintain code in project.

EX:
Use the button background as a pink for all the buttons
follow the folder pattern with existing naming convention
use functional components

These are the rules u will write in a md file and these are added always in the context no need to explicitely tell

u can have common instruction file under
.github/copilot-instructions.md -> specific to github copilot 
AGENTS.md -> any ai agent like claude,copilot,gemini etc.. refer this file by default and then checks for the specifc file like above

also u can have path specific or topic specific like
.github/instructions/frontend.instructions.md
.github/instructions/backend.instructions.md


Slash(/) commands or Prompts in copilot:
These are essentially predefined prompts or shortcuts for common tasks.
Ex: /explain or /test etc..

u can create ur wown slash command or prompt by creating a file inside the 
.github/prompts/addFileNameComment-prompt.md

to invoke 
/addFileNameComment #script.js  --> added the file name as a comment on the file itself # is for the file reference


Hooks in copilot:
These are automated actions that execute when a particular event occurs during an AI agent's workflow.
Based on the events of the workflow like postToolUse, sessionStart etc.. you can configure some task to be run
as a script

EX: on any modification to this(readme) file add the comment 
Author: Sid
Modification date: {date-and-time}
to the file top
after the tool usage

using /create-hook i created the hook it added 2 files 
.github\hooks\readme-modification.json
.github\hooks\scripts\add-readme-modification-comment.cjs

and updated the author and the date time of this file at the top as a readme change

