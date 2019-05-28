﻿Function Install-DockerAdvaniaGIT {
    param(
        [Parameter(Mandatory=$True, ValueFromPipelineByPropertyname=$true)]
        [PSObject]$SetupParameters,
        [Parameter(Mandatory=$True, ValueFromPipelineByPropertyname=$true)]
        [PSObject]$BranchSettings,
        [Parameter(Mandatory=$True, ValueFromPipelineByPropertyname=$true)]
        [String]$ContainerName
    )


    $DockerSettings = Invoke-ScriptInNavContainer -containerName $ContainerName -ScriptBlock { 
        param([PSObject]$SetupParameters, [PSObject]$BranchSettings, [String]$GeoId, [String]$LocaleName )
        Set-ExecutionPolicy -ExecutionPolicy Unrestricted 
        Set-WinHomeLocation -GeoId $GeoId
        Set-WinSystemLocale -SystemLocale $LocaleName
        Set-Culture -CultureInfo $LocaleName
        New-Item -Path 'C:\AdvaniaGIT' -ItemType Directory | Out-Null
        New-Item -Path 'C:\AdvaniaGIT\Log' -ItemType Directory | Out-Null
        Copy-Item -Path 'C:\Host\Scripts' -Destination 'C:\AdvaniaGIT' -Recurse
        Copy-Item -Path 'C:\Host\Data' -Destination 'C:\AdvaniaGIT' -Recurse
        Copy-Item -Path 'C:\Host\License' -Destination 'C:\AdvaniaGIT' -Recurse 
        Set-Location -Path "C:\AdvaniaGIT\Scripts"
        & .\Install-Modules.ps1 | Out-Null
        Write-Host "Updating BranchSettings.json..."
        $CustomConfigFile =  Join-Path $serviceTierFolder "CustomSettings.config"
        $CustomConfig = [xml](Get-Content $CustomConfigFile)
        $BranchSettings.instanceName = $customConfig.SelectSingleNode("//appSettings/add[@key='ServerInstance']").Value
        $BranchSettings.managementServicesPort = $customConfig.SelectSingleNode("//appSettings/add[@key='ManagementServicesPort']").Value
        $BranchSettings.databaseName = $customConfig.SelectSingleNode("//appSettings/add[@key='DatabaseName']").Value
        $BranchSettings.databaseInstance = $customConfig.SelectSingleNode("//appSettings/add[@key='DatabaseInstance']").Value
        $BranchSettings.clientServicesPort = $customConfig.SelectSingleNode("//appSettings/add[@key='ClientServicesPort']").Value
        $BranchSettings.developerServicesPort = $customConfig.SelectSingleNode("//appSettings/add[@key='DeveloperServicesPort']").Value
        $BranchSettings.databaseServer = $customConfig.SelectSingleNode("//appSettings/add[@key='DatabaseServer']").Value
        $BranchSettings.dockerContainerName = ""
        $BranchSettings.dockerContainerId = ""
        Set-Content -Path 'C:\AdvaniaGIT\Data\BranchSettings.json' -Value "{`"Branches`":  [] }" 
        Update-BranchSettings -BranchSettings $BranchSettings -SettingsFilePath "C:\AdvaniaGIT\Data\BranchSettings.Json"
        Write-Host "Updating GITSettings.json..."
        $GITSettings = Get-GITSettings -SettingsFilePath "C:\AdvaniaGIT\Data\GITSettings.Json"
        $GITSettings.workFolder = "C:\Host\Workspace"
        $GITSettings.rootPath = "C:\Host"
        $GITSettings.ftpServer = $SetupParameters.ftpServer
        $GITSettings.ftpUser = $SetupParameters.ftpUser
        $GITSettings.ftpPass = $SetupParameters.ftpPass
        $GITSettings.objectsNotToDelete = $SetupParameters.objectsNotToDelete
        Update-GITSettings -GITSettings $GITSettings -SettingsFilePath "C:\AdvaniaGIT\Data\GITSettings.Json"
        $DockerSettings = New-Object -TypeName PSObject
        $DockerSettings | Add-Member -MemberType NoteProperty -Name GITSettings -Value $GITSettings
        $DockerSettings | Add-Member -MemberType NoteProperty -Name BranchSettings -Value $BranchSettings
        Return $DockerSettings
    } -ArgumentList ($SetupParameters, $BranchSettings, (Get-WinHomeLocation).GeoId, (Get-WinSystemLocale).Name)
    Return $DockerSettings
}