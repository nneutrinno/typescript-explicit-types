import { commands, DocumentFilter, ExtensionContext, languages } from 'vscode';
import * as vscode from 'vscode';
import { GenereateTypeProvider } from './actionProvider';
import { commandHandler, commandId } from './command';

export function activate(context: ExtensionContext) {
  const selector: DocumentFilter[] = [];
  for (const language of ['typescript', 'typescriptreact']) {
    selector.push({ language, scheme: 'file' });
    selector.push({ language, scheme: 'untitled' });
  }

  const codeActionProvider = languages.registerCodeActionsProvider(selector, new GenereateTypeProvider(), GenereateTypeProvider.metadata);
  const command = vscode.commands.registerCommand(commandId, commandHandler);

  context.subscriptions.push(codeActionProvider);
  context.subscriptions.push(command);
}
