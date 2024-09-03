from flask import Flask, request, render_template, jsonify
from tools.generate_password import bp as password_generator_bp

app = Flask(__name__)

app.register_blueprint(password_generator_bp)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/profile-menu')
def profile_menu():
    section = request.args.get('section', 'profile')
    return render_template('profile-menu.html', section=section)

@app.route("/generate-password")
def generate_password():
    return render_template("generate-password.html")

@app.route("/manage-password")
def manage_password():
    return render_template("base.html")

@app.route("/media-downloader")
def media_downloader():
    return render_template("media-downloader.html")

@app.route("/Torrent-downloader")
def torrent_downloader():
    return render_template("torrent-downloader.html")

@app.route("/number-tracker")
def number_tracker():
    return render_template("number-tracker.html")

@app.route("/ip-tracker")
def ip_tracker():
    return render_template("ip-tracker.html")


if __name__ == '__main__':
    app.run(debug=True)
