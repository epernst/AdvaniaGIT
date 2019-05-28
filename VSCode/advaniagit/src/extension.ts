'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as terminal from './terminal';
import * as actions from './actions';
import { workspace, WorkspaceEdit, ShellExecution } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    terminal.ImportAdvaniaGITModule();    
    vscode.window.showInformationMessage('Switch the terminal window to AdvaniaGIT to see details');
    console.log('Congratulations, your extension AdvaniaGIT is now active!');
    
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let commandList = [
        vscode.commands.registerCommand('advaniagit.StartAdvaniaGITInstallation', () => {actions.StartAdvaniaGITInstallation()}),
        vscode.commands.registerCommand('advaniagit.StartAdvaniaGITContainerHostDebug', () => {actions.StartAdvaniaGITContainerHostDebug()}),
        vscode.commands.registerCommand('advaniagit.BuildDeltasInGIT', () => {actions.BuildDeltasInGIT(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.BuildDeltasFromSourceInGIT', () => {actions.BuildDeltasFromSourceInGIT(vscode.workspace.rootPath)}),                
        vscode.commands.registerCommand('advaniagit.BuildNavEnvironment', () => {actions.BuildNavEnvironment(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.BuildNavEnvironmentFromGIT', () => {actions.BuildNavEnvironmentFromGIT(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.BuildNAVNewSyntaxDeltasInGIT', () => {actions.BuildNAVNewSyntaxDeltasInGIT(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.BuildSource', () => {actions.BuildSource(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.BuildTarget', () => {actions.BuildTarget(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.CheckNAVEnvironment', () => {actions.CheckNAVEnvironment(vscode.workspace.rootPath)}),        
        vscode.commands.registerCommand('advaniagit.ConvertNAVNewSyntaxDeltasToAL', () => {actions.ConvertNAVNewSyntaxDeltasToAL(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ConvertNAVNewSyntaxObjectsToAL', () => {actions.ConvertNAVNewSyntaxObjectsToAL(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ConvertNAVNewSyntaxTestObjectsToAL', () => {actions.ConvertNAVNewSyntaxTestObjectsToAL(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.CreateCodeDeltas', () => {actions.CreateCodeDeltas(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.CreateDeltas', () => {actions.CreateDeltas(vscode.workspace.rootPath)}),        
        vscode.commands.registerCommand('advaniagit.CreateNavBackup', () => {actions.CreateNavBackup(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.CreateNavBackupOnFtpServer', () => {actions.CreateNavBackupOnFtpServer(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.CreateNavBacpac', () => {actions.CreateNavBacpac(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.CreateReverseDeltas', () => {actions.CreateReverseDeltas(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.CreateXlfLabelsInALCode', () => {actions.CreateXlfLabelsInALCode(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.CreateXlfFromCALTranslateFile', () => {actions.CreateXlfFromCALTranslateFile(vscode.workspace.rootPath)}), 
        vscode.commands.registerCommand('advaniagit.UpdateUsageCategory', () => {actions.UpdateUsageCategory(vscode.workspace.rootPath)}),         
        vscode.commands.registerCommand('advaniagit.BuildNAVSymbolReferences', () => {actions.BuildNAVSymbolReferences(vscode.workspace.rootPath)}),                                        
        vscode.commands.registerCommand('advaniagit.ExportGITtoModified', () => {actions.ExportGITtoModified(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ExportGITtoNAVNewSyntaxModified', () => {actions.ExportGITtoNAVNewSyntaxModified(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ExportGITtoNAVNewSyntaxSource', () => {actions.ExportGITtoNAVNewSyntaxSource(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ExportGITtoSource', () => {actions.ExportGITtoSource(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ExportGITSourceToSource', () => {actions.ExportGITSourceToSource(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ExportSourceToGITSource', () => {actions.ExportSourceToGITSource(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ExportNavFob', () => {actions.ExportNavFob(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ExportPermissionSets', () => {actions.ExportPermissionSets(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportNavFob', () => {actions.ImportNavFob(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportRemoteNavFob', () => {actions.ImportRemoteNavFob(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportFromGITtoNAV', () => {actions.ImportFromGITtoNAV(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportFromModifiedNAVtoGIT', () => {actions.ImportFromModifiedNAVtoGIT(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportFromModifiedNewSyntaxNAVtoGIT', () => {actions.ImportFromModifiedNewSyntaxNAVtoGIT(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportFromNAVNewSyntaxToGIT', () => {actions.ImportFromNAVNewSyntaxToGIT(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportFromNAVtoGIT', () => {actions.ImportFromNAVtoGIT(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportFromNAVtoTarget', () => {actions.ImportFromNAVtoTarget(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportFromTargetToGIT', () => {actions.ImportFromTargetToGIT(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportFromTestObjectsToNAV', () => {actions.ImportFromTestObjectsToNAV(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportFromTestLibrariesToNAV', () => {actions.ImportFromTestLibrariesToNAV(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ManageDatabases', () => {actions.ManageDatabases(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ManageInstances', () => {actions.ManageInstances(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ManageContainers', () => {actions.ManageContainers(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.MergeDeltas', () => {actions.MergeDeltas(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.PrepareNAVEnvironment', () => {actions.PrepareNAVEnvironment(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.PrepareNAVUnitTest', () => {actions.PrepareNAVUnitTest(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.RemoveNavEnvironment', () => {actions.RemoveNavEnvironment(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ReplaceGITwithTarget', () => {actions.ReplaceGITwithTarget(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.SaveTestResults', () => {actions.SaveTestResults(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.SaveTestResultsCsv', () => {actions.SaveTestResultsCsv(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StartClient', () => {actions.StartClient(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StartCompile', () => {actions.StartCompile(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StartDebugger', () => {actions.StartDebugger(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StartFinSql', () => {actions.StartFinSql(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StartFullTestsExecution', () => {actions.StartFullTestsExecution(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StartModifiedObjectsTestsExecution', () => {actions.StartModifiedObjectsTestsExecution(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StartFailedTestsExecution', () => {actions.StartFailedTestsExecution(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StartVSCode', () => {actions.StartVSCode(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.UpdateLaunchJsonForCurrentBranch', () => {actions.UpdateLaunchJsonForCurrentBranch(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.InstallALExtensionFromDocker', () => {actions.InstallALExtensionFromDocker(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StopAllDockerContainers', () => {actions.StopAllDockerContainers(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StartAllDockerContainers', () => {actions.StartAllDockerContainers(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.DiscoverAllDockerContainers', () => {actions.DiscoverAllDockerContainers(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StartWebClient', () => {actions.StartWebClient(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.StopNAVServices', () => {actions.StopNAVServices(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.SyncRemoteNAVInstance', () => {actions.SyncRemoteNAVInstance(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.UpdateNAVSource', () => {actions.UpdateNAVSource(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.UpgradeNAVInstallation', () => {actions.UpgradeNAVInstallation(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.RemoveNAVObjectsProperties', () => {actions.RemoveNAVObjectsProperties(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.UploadNAVDatabaseBackup', () => {actions.UploadNAVDatabaseBackup(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.DeleteOldLogs', () => {actions.DeleteOldLogs(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportFromAllGITtoNAV', () => {actions.ImportFromAllGITtoNAV(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.CreateNewBranchId', () => {actions.CreateNewBranchId(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.SaveContainerCredentials', () => {actions.SaveContainerCredentials(vscode.workspace.rootPath)}),        
        vscode.commands.registerCommand('advaniagit.NewGITBranch', () => {actions.NewGITBranch(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.NewFilesEncodingSettings', () => {actions.NewFilesEncodingSettings(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportAppsTools', () => {actions.ImportAppsTools(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportIdeTools', () => {actions.ImportIdeTools(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportInstanceAdminTools', () => {actions.ImportInstanceAdminTools(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportInstanceAppTools', () => {actions.ImportInstanceAppTools(vscode.workspace.rootPath)}),
        vscode.commands.registerCommand('advaniagit.ImportModelTools', () => {actions.ImportModelTools(vscode.workspace.rootPath)}),       
        vscode.commands.registerCommand('advaniagit.ImportNAVContainerHelper', () => {actions.ImportNAVContainerHelper()})
    ];
    
    context.subscriptions.concat(commandList);
}

// this method is called when your extension is deactivated
export function deactivate() {
}