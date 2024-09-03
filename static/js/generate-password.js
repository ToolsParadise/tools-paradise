document.addEventListener("DOMContentLoaded", function() {
    const passwordOption = document.querySelectorAll('input[name="password-option"]');
    const generateOptions = document.getElementById('generate-options');
    const generateButton = document.getElementById('generate-button');
    const resetButton = document.getElementById('reset-button');
    const saveButton = document.getElementById('save-button');
    const generatedPasswordTextarea = document.getElementById('generated-password');
    const appNameInput = document.getElementById('app-name');
    const usernameInput = document.getElementById('username');
    const passwordLengthInput = document.getElementById('password-length');
    const generatedPasswordHeading = document.querySelector('#generatedPasswordContainer h3');
    const passwordStrengthIndicator = document.getElementById('password-strength'); // Add an element to display strength

    function handlePasswordOptionChange() {
        const isGenerate = document.querySelector('input[name="password-option"]:checked').value === 'generate';
        
        // Show/hide elements based on the selected option
        if (isGenerate) {
            generateOptions.style.display = 'block';
            generateButton.style.display = 'inline-block';
            passwordLengthInput.style.display = 'block';
            generatedPasswordTextarea.style.display = 'block';
            generatedPasswordTextarea.setAttribute('readonly', true); // Ensure textarea is editable for generated passwords
            generatedPasswordHeading.textContent = 'Generated Password';
            passwordStrengthIndicator.style.display = 'none'; // Hide strength indicator
        } else {
            generateOptions.style.display = 'none'; // Hide generate options
            generateButton.style.display = 'none'; // Hide generate button
            passwordLengthInput.style.display = 'none'; // Hide password length input
            generatedPasswordTextarea.style.display = 'block'; // Keep the textarea visible
            generatedPasswordTextarea.removeAttribute('readonly'); // Ensure textarea is editable for existing passwords
            generatedPasswordHeading.textContent = 'Existing Password';
            passwordStrengthIndicator.style.display = 'block'; // Show strength indicator
        }
        
        // Clear the textarea if the option changes
        generatedPasswordTextarea.value = '';
        passwordStrengthIndicator.textContent = ''; // Clear the strength indicator
    }

    // Attach event listeners
    passwordOption.forEach(input => {
        input.addEventListener('change', handlePasswordOptionChange);
    });

    // Initialize the display based on the current selected option
    handlePasswordOptionChange();
    
    // Handle generate button click
    generateButton.addEventListener('click', function() {
        const length = parseInt(passwordLengthInput.value);
        if (isNaN(length) || length < 8 || length > 128) {
            alert("Password length must be between 8 and 128 characters");
            return;
        }
        fetch('/generate-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ 'password-length': length })
        })
        .then(response => response.json())
        .then(data => {
            if (data.password) {
                generatedPasswordTextarea.value = data.password;
            } else {
                alert(data.error);
            }
        });
    });

    // Handle existing password input to check strength
    generatedPasswordTextarea.addEventListener('input', function() {
        const password = generatedPasswordTextarea.value;

        // Show strength indicator if textarea is not empty
        if (password.trim()) {
            fetch('/generate-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ 'existing-password': password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.strength) {
                    const strength = data.strength;
                    passwordStrengthIndicator.innerHTML = `Strength: <span style="font-size:13px;">${strength}</span>`;
                    passwordStrengthIndicator.style.display = 'block'; 
                } else {
                    passwordStrengthIndicator.innerHTML = 'Error checking strength.';
                    passwordStrengthIndicator.style.display = 'block'; 
                }
            });
        } else {
            // Hide strength indicator if textarea is empty
            passwordStrengthIndicator.style.display = 'none';
        }
    });


    // Handle reset button click
    resetButton.addEventListener('click', function() {
        appNameInput.value = '';
        usernameInput.value = '';
        passwordLengthInput.value = '';
        generatedPasswordTextarea.value = '';
        passwordStrengthIndicator.textContent = '';
    });

    // Handle save button click
    saveButton.addEventListener('click', function() {
        const appName = appNameInput.value;
        const username = usernameInput.value;
        const password = generatedPasswordTextarea.value;

        if (!appName || !username || !password) {
            alert('Please fill in all fields before saving.');
            return;
        }

        fetch('/save-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                app_name: appName,
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Password saved successfully!");
            } else {
                alert("Failed to save password.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while saving the password.");
        });
    });
});
