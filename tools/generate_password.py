import random
import string
import json
from flask import Blueprint, render_template, request, jsonify

bp = Blueprint('password_generator', __name__)

# File to store generated passwords
PASSWORDS_FILE = 'generated_passwords.json'

def load_generated_passwords():
    try:
        with open(PASSWORDS_FILE, 'r') as f:
            return set(json.load(f))
    except FileNotFoundError:
        return set()

def save_generated_passwords(passwords):
    with open(PASSWORDS_FILE, 'w') as f:
        json.dump(list(passwords), f)

# Password generation logic
def generate_password(length):
    if length < 8 or length > 128:
        raise ValueError("Password length must be between 8 and 128 characters")
    
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for _ in range(length))
    
    # Check for duplicates
    generated_passwords = load_generated_passwords()
    if password in generated_passwords:
        raise ValueError("Generated password is a duplicate")
    
    generated_passwords.add(password)
    save_generated_passwords(generated_passwords)
    
    return password

# Password strength checker
def check_password_strength(password):
    score = 0
    if len(password) >= 12:
        score += 1
    if any(c.islower() for c in password):
        score += 1
    if any(c.isupper() for c in password):
        score += 1
    if any(c.isdigit() for c in password):
        score += 1
    if any(c in string.punctuation for c in password):
        score += 1

    # Strength evaluation based on score
    if score == 5:
        return 'Very Strong'
    elif score == 4:
        return 'Strong'
    elif score == 3:
        return 'Moderate'
    elif score == 2:
        return 'Weak'
    else:
        return 'Very Weak'


@bp.route("/generate-password", methods=['GET', 'POST'])
def generate_password_view():
    if request.method == 'POST':
        if 'password-length' in request.form:
            try:
                length = int(request.form['password-length'])
                password = generate_password(length)
                return jsonify({'password': password})
            except ValueError as e:
                return jsonify({'error': str(e)}), 400
        elif 'existing-password' in request.form:
            password = request.form['existing-password']
            strength_score = check_password_strength(password)
            return jsonify({'password': password, 'strength': strength_score})
    
    return render_template("generate-password.html")

@bp.route("/save-password", methods=['POST'])
def save_password():
    try:
        data = request.json
        app_name = data.get('app_name')
        username = data.get('username')
        password = data.get('password')

        if not app_name or not username or not password:
            return jsonify({'success': False, 'error': 'Missing fields'}), 400
        
        with open('saved_passwords.txt', 'a') as f:
            f.write(f"App: {app_name}, Username: {username}, Password: {password}\n")
        
        return jsonify({'success': True})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
