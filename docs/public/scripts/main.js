document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('numerology-form');
    const resultContainer = document.getElementById('result');
    const finalResult = document.getElementById('final-result');
    const resultImage = document.getElementById('result-image');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const dob = document.getElementById('dob').value;
        const time = document.getElementById('time').value;

        if (!name || !dob || !time) {
            resultContainer.innerHTML = '<p style="color: red;">Por favor, preencha todos os campos corretamente.</p>';
            return;
        }

        const numberMagic = calculateMagicNumber(name, dob, time);

        localStorage.setItem('user-data', JSON.stringify({ name, dob, time, numberMagic }));

        finalResult.textContent = `Seu número mágico é: ${numberMagic}`;
        resultContainer.innerHTML = '<p style="color: green;">Os dados foram processados com sucesso!</p>';

        displayResultImage(numberMagic);
    });

    function calculateMagicNumber(name, dob, time) {
        const nameSum = name.split('').reduce((sum, char) => sum + (char.charCodeAt(0) || 0), 0);
        const dobSum = dob.split('-').reduce((sum, part) => sum + parseInt(part, 10), 0);
        const timeSum = time.split(':').reduce((sum, part) => sum + parseInt(part, 10), 0);

        return (nameSum + dobSum + timeSum) % 9 || 9;
    }

    function displayResultImage(numberMagic) {
        const images = {
            1: 'https://source.unsplash.com/800x600/?leadership',
            2: 'https://source.unsplash.com/800x600/?collaboration',
            3: 'https://source.unsplash.com/800x600/?creativity',
            4: 'https://source.unsplash.com/800x600/?stability',
            5: 'https://source.unsplash.com/800x600/?adventure',
            6: 'https://source.unsplash.com/800x600/?nurturing',
            7: 'https://source.unsplash.com/800x600/?spirituality',
            8: 'https://source.unsplash.com/800x600/?power',
            9: 'https://source.unsplash.com/800x600/?compassion'
        };

        resultImage.src = images[numberMagic] || 'https://source.unsplash.com/800x600/?mystery';
        resultImage.alt = `Imagem representando o número mágico ${numberMagic}`;
    }
});
