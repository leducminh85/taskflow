# Create a new user account
$registerBody = @{
    email = "test@example.com"
    password = "password123"
    name = "Test User"
} | ConvertTo-Json

Write-Host "Creating test account..."
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $registerBody

Write-Host "Account created successfully:"
$response | ConvertTo-Json

Write-Host "`nYou can now login with:"
Write-Host "Email: test@example.com"
Write-Host "Password: password123" 