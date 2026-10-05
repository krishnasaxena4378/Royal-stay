from flask import Flask, render_template, request
import datetime
import os

# Static files (CSS, JS, images) live in the "public" folder.
# Vercel serves files from "public" automatically, and this setting makes
# Flask serve them from the same URLs when running locally.
app = Flask(__name__, static_folder='public', static_url_path='')

# Vercel only allows writing files inside /tmp, so use it there.
# Locally, bookings are saved next to app.py as before.
if os.environ.get('VERCEL'):
    BOOKINGS_FILE = '/tmp/bookings.txt'
else:
    BOOKINGS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'bookings.txt')

# Basic routes for each page
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/rooms')
def rooms():
    return render_template('rooms.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# Booking route handles showing the form (GET) and submitting it (POST)
@app.route('/booking', methods=['GET', 'POST'])
def booking():
    success = False
    error = None

    if request.method == 'POST':
        # 1. Receive data from the HTML form
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        checkin = request.form.get('checkin')
        checkout = request.form.get('checkout')
        guests = request.form.get('guests')
        room = request.form.get('room')
        
        # 2. Simple Backend Validation (Ensure dates are logical)
        # Getting today's date in YYYY-MM-DD format
        today = datetime.date.today().strftime('%Y-%m-%d')
        
        # Check-in cannot be before today, Check-out must be after Check-in
        if checkin and checkout and checkin >= today and checkout > checkin:

            # 3. Save the booking data to a text file
            # 'a' mode means append (add to the end without deleting old data)
            try:
                with open(BOOKINGS_FILE, 'a') as file:
                    file.write(f"Name: {name}\n")
                    file.write(f"Email: {email}\n")
                    file.write(f"Phone: {phone}\n")
                    file.write(f"Room: {room}\n")
                    file.write(f"Check-in: {checkin}\n")
                    file.write(f"Check-out: {checkout}\n")
                    file.write(f"Guests: {guests}\n")
                    file.write("----------------------------\n")
            except OSError:
                # Saving can fail on some hosts; the page should still work
                pass

            # Set success to True to show the message on the webpage
            success = True
        else:
            error = "Please choose valid dates: check-in must be today or later, and check-out must be after check-in."

    # Render the page and pass the success / error variables
    return render_template('booking.html', success=success, error=error)

if __name__ == '__main__':
    # Run the application
    app.run(debug=True, port=5000)
