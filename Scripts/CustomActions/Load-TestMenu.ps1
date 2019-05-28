﻿Check-NAVServiceRunning -SetupParameters $SetupParameters -BranchSettings $BranchSettings

do {
    Clear-Host
    Write-Host ""
    Write-Host "Test Menu for branch $($SetupParameters.navRelease) $($SetupParameters.Branchname)"
    Write-Host ""
    $input = Read-Host "Please select action :
        0 = return
        1 = Run All Automated Tests
        2 = Run Failed Tests Only
        3 = Run Tests on Modified Objects 
        4 = Show Automated Test Results
        "
    $currentbranch = git.exe rev-parse --abbrev-ref HEAD
    if ($SetupParameters.Branchname -ne $currentbranch) {
        Write-Host -ForegroundColor Red "Menu is running on branch $($SetupParameters.Branchname) but you have switched to branch $currentbranch"
        $input = Read-Host "Press enter to continue..."
    } else {
        if ($SetupParameters.testCompanyName) {
            $companyName = $SetupParameters.testCompanyName
        } else {
            $companyName = Get-FirstCompanyName -SQLServer (Get-DatabaseServer -BranchSettings $BranchSettings) -SQLDb $BranchSettings.databaseName
        }

        switch ($input) {
            '0' { exit }
            '1' { 

                $CompanyRegistrationNo = Initialize-NAVTestCompanyRegistrationNo -BranchSettings $BranchSettings -CompanyName $companyName
                Prepare-NAVTestExecution -SetupParameters $SetupParameters -BranchSettings $BranchSettings -CompanyName $companyName 
                & (Join-Path $PSScriptRoot Prepare-NAVUnitTest.ps1) 
                & (Join-path $PSScriptRoot Start-TestClient.ps1)
                Set-NAVCompanyInfoRegistrationNo -BranchSettings $BranchSettings -CompanyName $companyName -RegistrationNo $CompanyRegistrationNo
            
                }
            '2' { 

                $CompanyRegistrationNo = Initialize-NAVTestCompanyRegistrationNo -BranchSettings $BranchSettings -CompanyName $companyName
                Prepare-NAVTestExecution -SetupParameters $SetupParameters -BranchSettings $BranchSettings -CompanyName $companyName -OnlyFailingTests
                & (Join-Path $PSScriptRoot Prepare-NAVUnitTest.ps1) 
                & (Join-path $PSScriptRoot Start-TestClient.ps1)
                Set-NAVCompanyInfoRegistrationNo -BranchSettings $BranchSettings -CompanyName $companyName -RegistrationNo $CompanyRegistrationNo

                }
            '3' { 

                $CompanyRegistrationNo = Initialize-NAVTestCompanyRegistrationNo -BranchSettings $BranchSettings -CompanyName $companyName
                Prepare-NAVTestExecution -SetupParameters $SetupParameters -BranchSettings $BranchSettings -CompanyName $companyName -ForModifiedObjects
                & (Join-Path $PSScriptRoot Prepare-NAVUnitTest.ps1) 
                & (Join-path $PSScriptRoot Start-TestClient.ps1)
                Set-NAVCompanyInfoRegistrationNo -BranchSettings $BranchSettings -CompanyName $companyName -RegistrationNo $CompanyRegistrationNo

                } 
            '4' { & (Join-Path $PSScriptRoot Save-TestResultsCsv.ps1) }

        }                    
        $input = Read-Host "Press enter to continue..."
    }
}
until ($input -ieq '0')        
