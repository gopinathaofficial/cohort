function calculate() {
    // Get input values
    var capital = parseFloat(document.getElementById('capital').value);
    var interest = parseFloat(document.getElementById('interest').value);
    var duration = parseFloat(document.getElementById('duration').value);

    // Validate input
    if (isNaN(capital) || isNaN(interest) || isNaN(duration) || capital <= 0 || interest <= 0 || duration <= 0) {
        alert("Please enter valid values for capital, interest, and duration.");
        return;
    }

    // Calculate total return
    var totalReturn = capital * (1 + interest / 100 * duration);

    // Display result
    document.getElementById('result').innerHTML = 'Total Return: RS.' + totalReturn.toFixed(2);
}
