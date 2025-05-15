// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Reset to first tab when switching to components page
    if(pageId === 'components') {
        openTab('microcontrollers');
    }
    
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
}

// Tab functionality
function openTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Activate clicked button
    event.currentTarget.classList.add('active');
}

// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside content
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        closeModal();
    }
}

function copyCode(button) {
  const codeBlock = button.nextElementSibling;
  const textToCopy = codeBlock.innerText;

  navigator.clipboard.writeText(textToCopy).then(() => {
    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1500);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}


// Search functionality
function searchComponents() {
    const input = document.getElementById('component-search');
    const filter = input.value.toUpperCase();
    const cards = document.querySelectorAll('.component-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;
        const text = (title + " " + desc).toUpperCase();
        
        if (text.includes(filter)) {
            card.style.display = '';
            // Highlight matching text
            const regex = new RegExp(filter, 'gi');
            card.querySelector('h3').innerHTML = title.replace(
                regex, 
                match => `<span class="highlight">${match}</span>`
            );
            card.querySelector('p').innerHTML = desc.replace(
                regex,
                match => `<span class="highlight">${match}</span>`
            );
        } else {
            card.style.display = 'none';
        }
    });
    
    // Auto-open relevant tab if search matches
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab.querySelector('.component-card[style=""]')) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => {
            if (tab.querySelector('.component-card[style=""]')) {
                const tabId = tab.id;
                document.querySelector(`.tab-btn[onclick="openTab('${tabId}')"]`).click();
            }
        });
    }
}

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Initialize with home page active
document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
});

// Activity data for each component
const activities = {
    dht11: [
        "Print temperature and humidity values to the Serial Monitor.",
        "Show the temperature and humidity on an I2C LCD or OLED display.",
        "Turn on an LED if the temperature goes above a set threshold (e.g., 30°C).",
        "Sound a buzzer when humidity drops below a certain level (e.g., 40%).",
        "Use Arduino’s Serial Plotter to graph live temperature and humidity values.",
        "Log temperature and humidity readings to the Serial Monitor every minute.",
        "Control a fan (via relay or transistor) when the temperature exceeds a set value.",
        "Send temperature and humidity data to a web page using ESP32’s web server.",
        "Use RGB LED to indicate climate such as blue for cold, green for normal, and red for hot.",
        "Print a warning message in Serial when temperature or humidity is abnormal.",
    ],
    pir: [
        "Turn on an LED when motion is detected.",
        "Sound a buzzer when someone passes in front of the sensor.",
        "Print Motion Detected to the Serial Monitor when motion is detected.",
        "Turn on an LED when motion is detected and automatically turn it off after 10 seconds.",
        "Count how many times motion is detected and show the total in the Serial Monitor.",
        "Log the time (or number of seconds since start) when motion occurs.",
        "Turn on an OLED display only when motion is detected.",
        "Show Red LED when motion is detected, Green when no motion.",
        "Trigger a buzzer and blink an LED when motion is detected and “arm” the system using a button.",
        "Send a motion alert to a web server or display message on a webpage via ESP32.",
    ],
    ultrasonic: [
        "Measure and display the distance in centimeters on the Serial Monitor.",
        "Turn on an LED if an object is detected closer than 10 cm.",
        "Activate a buzzer when an object is within a set distance range (e.g., 5–15 cm).",
        "Change RGB LED color based on distance such as green for far, yellow for medium, red for too close.",
        "Show live distance readings on an OLED or I2C LCD screen.",
        "Count how many objects pass in front of the sensor (within range).",
        "Open a servo-controlled door when a person is detected within 20 cm.",
        "Sound an alert if someone comes closer than 1 meter (social distancing).",
        "Turn on a fan (relay) when someone approaches the desk.",
        "Log distance measurements over time using the Serial Monitor.",
    ],
    flame:[
        "Print 'Flame Detected!' on the Serial Monitor when a flame is sensed.",
        "Turn on an LED when a flame is detected.",
        "Sound a buzzer when a flame is detected.",
        "Count how many times a flame is detected and show the count in Serial Monitor.",
        "Use multiple LEDs to indicate flame proximity (if using analog output flame sensor).",
        "Move a servo to close a cover or activate a safety mechanism when flame is detected.",
        "Create a simple fire alarm system with buzzer, LED, and flame sensor.",
        "Use ESP32 to create a web page that shows a flame alert when fire is detected.",
        "Show 'SAFE' or 'FLAME DETECTED' on an OLED screen.",
        "Turn off a device using a relay module when a flame is detected.",
    ],
    ldr:[
        "Display the LDR sensor value (analog input) on the Serial Monitor.",
        "Turn on an LED automatically when it gets dark.",
        "Indicate the light level with RGB LED such as red for dark, yellow for dim, and green for bright.",
        "Sound a buzzer when the light level drops below a certain threshold.",
        "Use 5 LEDs to create a bar graph showing current light level.",
        "Display the light level numerically on an OLED screen.",
        "Turn on a fan if light gets too intense (simulating sun protection for plants).",
        "Log light values over time to the Serial Monitor every few seconds.",
        "Compare two LDRs; activate a servo if one gets more light than the other.",
        "Turn on a light, off, on, off (like Morse code) to unlock an action (e.g., turn on LED).",
    ],
    sound:[
        "Turn on an LED when a clap or loud sound is detected.",
        "Use a sound to toggle an LED on or off.",
        "Count how many times a sound (like a clap) occurs and display the count on Serial Monitor.",
        "Display sound intensity using a bar of 5 LEDs based on analog readings.",
        "Sound another buzzer when a loud sound is detected.",
        "Move a servo motor briefly when a sound is detected.",
        "Display the sound status if 'Quiet' or 'Sound Detected'",
        "Use a relay to control a fan or light via a sound trigger.",
        "Log each time sound is detected, and print timestamps on Serial Monitor.",
        "Activate an LED and buzzer as an alarm when unexpected noise is detected (e.g., in a quiet room).",
    ],
    gas:[
        "Read gas concentration from the sensor and display the analog value on the Serial Monitor.",
        "Turn on an LED when gas concentration exceeds a threshold.",
        "Sound a buzzer when gas is detected above a certain level.",
        "Use 3 LEDs (Green, Yellow, Red) to indicate low, medium, and high gas levels.",
        "Show real-time gas readings on an OLED screen.",
        "Automatically turn on a fan when gas levels are high (simulate ventilation).",
        "Display gas level on a web page served by the ESP32.",
        "Log gas readings over time to the Serial Monitor or to an SD card.",
        "Display sensor values and allow manual setting of a threshold using a potentiometer.",
        "Power the system with a battery, include LED + buzzer alerts for use as a portable gas ",
    ],
    water:[
        "Read and display the water level sensor's analog value in the Serial Monitor.",
        "Turn on an LED when the water level drops below a certain point",
        "Sound a buzzer when the water tank is full.",
        "Use multiple LEDs to represent different water levels (e.g., Empty, Low, Mid, Full).",
        "Show the water level percentage on an OLED or I2C LCD.",
        "Display the current water level on a web page hosted by ESP32.",
        "Automatically turn on/off a water pump using a relay based on the level.",
        "Log water level values to the Serial Monitor every few seconds.",
        "Use RGB LED for Visual Alarm System (e.g.,Safe, Mid, Overflow or Low)",
        "Use 2–3 float switches to detect different tank levels (e.g., low, half, full) and control LEDs or pumps accordingly.",
    ],
    ir:[
        "Turn on an LED when an object is detected by the IR sensor.",
        "Sound a buzzer when an object is detected in front of the IR sensor.",
        "Use two IR sensors to detect left/right obstacles and control two motors to avoid them.",
        "Display “Obstacle Detected” or “Clear” in the Serial Monitor based on sensor status.",
        "Count the number of objects passing in front of the sensor.",
        "Adjust LED brightness based on proximity (using analog output IR sensor).",
        "Turn a device (e.g., fan, LED) on/off with a hand wave.",
        "Trigger an alarm when someone enters a detection zone.",
        "Detect if a surface is dark or light based on reflected IR.",
        "Measure and visualize how close/far the object is from the sensor.",
    ],
    lcd:[
        "Print 'Hello, World!' on the LCD.",
        "Use an RTC module to display the current time and date.",
        "Display a counter that increases every second.",
        "Use a potentiometer to change the text position on the LCD.",
        "Scroll a long message across the LCD.",
        "Display readings from a sensor like temperature (DHT11), light (LDR), or distance (ultrasonic).",
        "Use push buttons to navigate between simple menu options on the LCD.",
        "Show a simple bar graph (e.g., for temperature or light) using custom characters.",
        "Create a basic quiz where questions and answers are shown on the LCD and chosen with buttons.",
        "Display a welcome message when a specific button or card (RFID) is scanned.",
    ],
    tft:[
        "Show “Welcome!” or any greeting on the TFT screen.",
        "Read a sensor and display the value on screen",
        "Cycle through different background colors",
        "Display different shapes using buttons",
        "Display time using an rtc module on tft display in a digital clock format.",
        "Create a simple animation (moving object).",
        "Show a button state (pressed or released) visually.",
        "Create a dynamic bar graph for sensors.",
        "Display BMP or JPEG Images from SD Card.",
        "Display menu options and navigate using physical buttons",
    ],
    matrix:[
        "Show a static message like 'HELLO' on the matrix.",
        "Make a message scroll from right to left across the matrix.",
        "Display the current time using an RTC module.",
        "Show different custom patterns or icons (smiley face, heart, etc.) on the matrix.",
        "Change the displayed message each time a button is pressed.",
        "Light up columns based on microphone/sound sensor input.",
        "Press a button to display a random number (1-6) using dot patterns like dice.",
        "Create a reactive animation that lights up with music beats (using sound sensor).",
        "Send a message from the Serial Monitor and display it on the matrix.",
        "Build a basic game like Snake or Pong using buttons and the LED matrix.",
    ],
    sevenseg:[
        "Show a number from 0-9 on a single digit 7-segment display.",
        "Make a simple countdown with a 1-second delay.",
        "Increase the number shown on the display every time a button is pressed.",
        "Decrease the number shown on the display every time a button is pressed.",
        "Loop through digits 0-9 repeatedly with short delays.",
        "Display a random number from 0-9 every time a button is pressed.",
        "Blick specific segments based on binary representation.",
        "Use a potentiometer to display digits from 0-9.",
        "Light up each segment (A-G and dot) one at a time.",
        "Use sigle digit 7-segment display to indicate sensors (e.g., 0 is low and 9 is high).",
    ],
    foursevenseg:[
        "Show a fixed number on the 4-digit display.",
        "Create a countdown from 9999 to 0000.",
        "Increment the number each time a button is pressed.",
        "Display time in hours and minutes using a real-time clock",
        "Continuously loop numbers from 0000 to 9999.",
        "Read temperature or humidity and show it on the display (e.g., 24.5 as 245).",
        "Show a random number between 0000 and 9999 when a button is pressed.",
        "Read analog input and map it to a 0–9999 range for display.",
        "Show specific text-like codes to indicate system states.",
        "Generate a random math question and show the answer after a button press.",
    ],
    servo:[
        "Move the servo from 0° to 180° and back continuously.",
        "Use a button to rotate the servo to a specific angle (e.g., 90° when pressed).",
        "Rotate the servo based on the position of a potentiometer.",
        "Use an IR remote or Bluetooth module to set servo positions.",
        "Rotate the servo to lock/unlock a latch when a condition is met (e.g., correct button press or password).",
        "Save and return the servo to predefined positions (like presets using buttons).",
        "Move the servo to a certain angle after a delay or at a specific time interval.",
        "Move the servo when a sensor crosses a threshold (e.g., open a fan when it's hot).",
        "Use the servo to simulate movement (like eyelids or mouth on a robot face).",
        "Open a small gate or door with the servo when an object is detected (e.g., using IR or PIR sensor).",
    ],
    relay:[
        "Use a relay to control a simple LED lamp or low-watt bulb.",
        "Turn a relay on or off using a physical button.",
        "Use a delay to turn a device on after 5 seconds, then off after another 5 seconds.",
        "Toggle the relay using an IR remote or Bluetooth command.",
        "Use a real-time clock (RTC) to switch a light or fan on/off at set times.",
        "Turn on a fan or light when temperature/light crosses a threshold.",
        "Use a keypad or serial input to enter a password that enables the relay.",
        "First button press turns relay ON, second press turns it OFF.",
        "Turn the relay on/off using a mobile app or web server on ESP32.",
        "Use 2–4 relays to control multiple devices (e.g., fan, bulb, charger).",
    ],
    Pbuzzer:[
        "Turn the buzzer on for 1 second, then off.",
        "Trigger the buzzer after a countdown.",
        "Make the buzzer beep when a button is pressed.",
        "Create a sequence of short and long beeps.",
        "Use a passive buzzer to play a short tune (e.g., “Happy Birthday”).",
        "Trigger the buzzer when a sensor value (like temperature) exceeds a threshold.",
        "Make the buzzer beep once for each correct input, and long for incorrect",
        "Sound the buzzer when light level drops below a certain value.",
        "Buzz when a door is opened using a sensor.",
        "Make the buzzer sound only for the first player who presses a button.",
    ],
    rgb:[
        "Display Red, Green, and Blue one after another.",
        "Mix red, green, and blue to make a custom color (e.g., purple or cyan).",
        "Gradually fade from one color to another.",
        "Use 3 potentiometers to control the intensity of Red, Green, and Blue.",
        "Change the LED color each time a button is pressed.",
        "Generate random colors every few seconds.",
        "Show different colors based on temperature ranges (e.g., blue for cold, red for hot).",
        "Change the RGB color based on time of day (morning = yellow, night = blue, etc.).",
        "Make the RGB LED flash or change color based on sound level.",
        "Create a smooth pulsing effect of one or more colors (like a “breathing” LED).",
    ],
    leds:[
        "Make the LED turn on and off every second.",
        "Turn the LED on only while a button is being pressed.",
        "Turn the LED on for 5 seconds, then off automatically.",
        "Turn on the LED if a certain condition is met (e.g., sensor value too high).",
        "Use a potentiometer to adjust the brightness of the LED using PWM.",
        "Make the LED fade in and out continuously.",
        "Make the LED light up when sound is detected (with a sound sensor).",
        "Turn on the LED when the surrounding light is low.",
        "Blink the LED at random intervals.",
        "Use the LED to flash out a simple Morse code message (like SOS).",
    ],
    button:[
        "Turn an LED on when the button is pressed and off when released.",
        "Each button press toggles the LED between on and off.",
        "Press the button to start a 5-second countdown, then turn on an LED or buzzer.",
        "Display how many times the button has been pressed.",
        "Press the button as fast as possible when an LED lights up.",
        "Use a sequence of short and long presses to simulate a password.",
        "Move a servo to different angles based on button presses.",
        "Use two buttons to increase or decrease a number shown on an LCD or Serial Monitor.",
        "Make a buzzer sound when the button is pressed.",
        "Pressing the button cycles through red, yellow, and green LEDs.",
    ],
    potentio:[
        "Show the analog value (0–1023) from the potentiometer on the Serial Monitor.",
        "Use the potentiometer to adjust the brightness of an LED.",
        "Use the potentiometer to change the frequency of a buzzer tone.",
        "Use 3 potentiometers to control the red, green, and blue values of an RGB LED.",
        "Simulate a volume control for a buzzer or other output.",
        "Rotate a servo based on the potentiometer position (0°–180°).",
        "Display the potentiometer reading on an LCD or OLED display.",
        "Plot the potentiometer value in Arduino Serial Plotter.",
        "Use the potentiometer to select options in a simple menu or game.",
        "Turn on an LED or buzzer when the potentiometer value crosses a certain level.",
    ],
    irrec:[
        "Read and display the button codes from your IR remote using the Serial Monitor.",
        "Press a specific button on the remote to turn an LED on or off.",
        "Assign different IR remote buttons to control different LEDs.",
        "Press the same remote button to toggle an LED between on and off.",
        "Use volume up/down buttons to increase or decrease LED brightness using PWM.",
        "Move a servo to different angles based on remote button presses.",
        "Use remote buttons to start or stop a countdown timer that activates a buzzer.",
        "Create a basic password system using a sequence of IR button presses.",
        "Display different messages on an LCD screen based on which remote button is pressed.",
        "Use the remote to simulate turning on lights, fans, or appliances via LEDs or relays.",
    ],
    stepmotor:[
        "Control a motor using digitalWrite() to start and stop it.",
        "Create a button function that change the rotation of the stepper motor.",
        "Create an adjustable speed using the potentiometer.",
        "Rotate continuously to simulate a moving platform or conveyor.",
        "Run the motor until a limit switch or sensor is triggered.",
        "Run the motor for specific time, then stop.",
        "Create a motorized fan or sliding door simulator that turns on when a button or sensor is triggered.",
        "Use an ultrasonic sensor (UDS) to start the motor when an object is nearby.",
        "Create multiple button function (Go, Stop, & Turn) with the stepper motor.",

    ],
    rtcMod:[
        "Read and print the current time (HH:MM:SS) to the Serial Monitor.",
        "Show the full date and time (DD/MM/YYYY HH:MM:SS).",
        "Turn an LED on at a specific time and off later.",
        "Display live time on a screen (LCD1602 or OLED 128x64).",
        "Set the initial date and time on your RTC module manually or using serial commands.",
        "Trigger a buzzer alarm at a specific time of day.",
        "Use the RTC to timestamp sensor readings (e.g., temperature) and log them to SD card.",
        "Simulate a timed light system (e.g., turn lights on at 6 PM, off at 6 AM).",
        "Use current time to calculate and display a countdown to a future event.",
    ],
    freertos:[
        "Blink two LEDs at different intervals using separate FreeRTOS tasks.",
        "Blink an LED with delays managed by vTaskDelay() instead of delay().",
        "Print the current task name and tick count on the Serial Monitor.",
        "Handle button press detection in a task with built-in debouncing logic.",
        "Use a binary semaphore to switch between two different LED patterns.",
        "Run two tasks with different priorities and observe their behavior.",
    ],
};

// Generate random activity
function generateActivity(component) {
    const activityContent = document.getElementById(`${component}-activity`);
    const componentActivities = activities[component];
    
    if (componentActivities && componentActivities.length > 0) {
        const randomIndex = Math.floor(Math.random() * componentActivities.length);
        activityContent.textContent = componentActivities[randomIndex];
    } else {
        activityContent.textContent = "No activities available for this component yet.";
    }
}