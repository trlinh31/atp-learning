$remoteBranch = "github/main"
$prefix = "atp-community-main/"

Write-Host "Fetching remote file list..."
$remoteFiles = git ls-tree -r $remoteBranch --name-only | Where-Object { $_ -like "$prefix*" }

$results = @()

foreach ($remotePath in $remoteFiles) {
    if ([string]::IsNullOrWhiteSpace($remotePath)) { continue }
    
    $localPath = $remotePath.Substring($prefix.Length)
    
    if (Test-Path $localPath) {
        # Compare content hashes
        $remoteHash = git rev-parse "$remoteBranch`:$remotePath"
        $localHash = git hash-object $localPath
        
        if ($remoteHash -ne $localHash) {
             $results += [PSCustomObject]@{
                Status = "MODIFIED"
                File = $localPath
                RemotePath = $remotePath
            }
        }
    } else {
        $results += [PSCustomObject]@{
            Status = "REMOTE_ONLY"
            File = $localPath
            RemotePath = $remotePath
        }
    }
}

$results | ConvertTo-Json -Depth 2
