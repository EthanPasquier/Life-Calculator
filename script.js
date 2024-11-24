document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('life-form');
    const result = document.getElementById('result');
    const timeLeft = document.getElementById('time-left');
    const deathType = document.getElementById('death-type');

    const deathTypes = [
        {
            type: "Mort par Pizza 🍕",
            description: "L'ananas sur ta pizza s'est rebellé et a pris sa revanche!",
            conditions: ['pizza']
        },
        {
            type: "Mort TikTok 📱",
            description: "Ton dernier défi viral était de trop... mais au moins tu as eu 1M de vues!",
            conditions: ['tiktok', 'yolo']
        },
        {
            type: "Mort Extra-Terrestre 👽",
            description: "Les aliens sont revenus... cette fois pour de bon! (Ils n'ont pas aimé tes memes sur Roswell)",
            conditions: ['alien', 'conspiracy']
        },
        {
            type: "Mort Féline 😺",
            description: "Ton chat a finalement décidé de mettre son plan maléfique à exécution pendant ton sommeil",
            conditions: ['catLord']
        },
        {
            type: "Mort Manager 😤",
            description: "Le manager que tu as tant demandé à voir était en fait la Faucheuse",
            conditions: ['karen']
        },
        {
            type: "Mort Gaming 🎮",
            description: "Tu as dit 'ez' une fois de trop... La malédiction des noobs t'a rattrapé!",
            conditions: ['games']
        },
        {
            type: "Mort Matrix 💊",
            description: "Le mélange des pilules rouge et bleue t'a envoyé dans la 5ème dimension",
            conditions: ['matrix']
        },
        {
            type: "Mort Nokia 📱",
            description: "Ton Nokia 3310 est tombé sur ton petit orteil... RIP",
            conditions: ['nokia']
        },
        {
            type: "Mort Chuck Norris 👊",
            description: "Chuck Norris a éternué pendant ton baptême... Tu n'as pas survécu au coup de vent",
            conditions: ['chuck']
        },
        {
            type: "Mort Plate 🌍",
            description: "Tu es tombé du bord de la Terre en essayant de prouver qu'elle était plate",
            conditions: ['conspiracy']
        },
        {
            type: "Mort Fashion 🧦",
            description: "La police de la mode t'a finalement rattrapé... Sentence: FATALE",
            conditions: ['socks']
        },
        {
            type: "Mort YOLO 🎢",
            description: "Tu vis qu'une fois... mais tu meurs aussi qu'une fois!",
            conditions: ['yolo']
        },
        {
            type: "Mort Alcoolique 🍺",
            description: "Ton foie a démissionné après une dernière soirée mémorable!",
            conditions: ['drink']
        },
        {
            type: "Mort Sportive 🏃",
            description: "Tu as couru si vite que tu as créé un trou noir temporel!",
            conditions: ['sport']
        },
        {
            type: "Mort Fumante 🚬",
            description: "Tes poumons ont décidé de prendre leur retraite anticipée!",
            conditions: ['smoke']
        }
    ];

    function calculateLifeExpectancy(formData) {
        const currentAge = parseInt(formData.get('currentAge')) || 0;
        if (currentAge <= 0 || currentAge > 120) {
            alert("Entre un âge valide!");
            return null;
        }

        let baseAge = Math.floor(Math.random() * (85 - 65) + 65); // Base aléatoire entre 65 et 85 ans
        let modifiers = 0;
        
        // Impact des choix sur l'espérance de vie
        const impacts = {
            smoke: -15 + Math.floor(Math.random() * 5),
            drink: -10 + Math.floor(Math.random() * 5),
            sport: 8 + Math.floor(Math.random() * 5),
            alien: Math.random() > 0.5 ? 10 : -10,
            conspiracy: -5 + Math.floor(Math.random() * 3),
            catLord: -7 + Math.floor(Math.random() * 4),
            pizza: -3 + Math.floor(Math.random() * 2),
            socks: -2 + Math.floor(Math.random() * 2),
            karen: -8 + Math.floor(Math.random() * 4),
            yolo: -12 + Math.floor(Math.random() * 6),
            tiktok: -15 + Math.floor(Math.random() * 7),
            games: -5 + Math.floor(Math.random() * 3),
            nokia: 10 + Math.floor(Math.random() * 5),
            matrix: Math.random() > 0.7 ? 20 : -5,
            chuck: 15 + Math.floor(Math.random() * 7)
        };

        // Appliquer les modificateurs pour chaque option cochée
        for (let [key, value] of Object.entries(impacts)) {
            if (formData.get(key)) {
                modifiers += value;
            }
        }

        // Ajouter un facteur aléatoire supplémentaire
        modifiers += Math.floor(Math.random() * 20) - 10;

        // Calculer l'âge final avec des limites réalistes
        let finalAge = baseAge + modifiers;
        finalAge = Math.max(currentAge + 1, Math.min(100, finalAge));

        // Calculer les années restantes
        const yearsLeft = finalAge - currentAge;
        return yearsLeft;
    }

    function selectDeathType(formData) {
        // Créer un tableau des types de mort possibles basé sur les options cochées
        const possibleDeaths = deathTypes.filter(death => {
            return death.conditions.some(condition => formData.get(condition));
        });

        // Si aucune mort spécifique ne correspond, utiliser une mort aléatoire
        if (possibleDeaths.length === 0) {
            return deathTypes[Math.floor(Math.random() * deathTypes.length)];
        }

        // Sélectionner une mort aléatoire parmi les possibles
        return possibleDeaths[Math.floor(Math.random() * possibleDeaths.length)];
    }

    function animateNumber(element, finalNumber, duration = 2000) {
        let startNumber = 0;
        const steps = 60;
        const increment = finalNumber / steps;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const animation = setInterval(() => {
            currentStep++;
            startNumber += increment;
            element.textContent = Math.round(startNumber) + " ans";

            if (currentStep >= steps) {
                clearInterval(animation);
                element.textContent = finalNumber + " ans";
                element.classList.add('glitch');
                setTimeout(() => element.classList.remove('glitch'), 1000);
            }
        }, stepDuration);
    }

    // Gestionnaire d'événement pour le formulaire
    document.addEventListener('submitForm', () => {
        const formData = new FormData(form);
        const yearsLeft = calculateLifeExpectancy(formData);
        
        if (yearsLeft === null) return;

        const selectedDeath = selectDeathType(formData);
        
        result.classList.remove('result-hidden');
        animateNumber(timeLeft, yearsLeft);

        // Effet de machine à écrire pour le message de mort
        deathType.textContent = '';
        const fullMessage = `${selectedDeath.type}\n${selectedDeath.description}`;
        let charIndex = 0;

        const typeWriter = setInterval(() => {
            if (charIndex < fullMessage.length) {
                deathType.textContent += fullMessage.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeWriter);
                deathType.classList.add('glitch');
                setTimeout(() => deathType.classList.remove('glitch'), 1000);
            }
        }, 50);

        // Effet visuel sur le résultat
        result.style.animation = 'none';
        result.offsetHeight;
        result.style.animation = null;
    });

    // Easter egg: Konami code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                timeLeft.textContent = "42 ans";
                deathType.textContent = "🎮 CHEAT CODE ACTIVÉ: LA RÉPONSE UNIVERSELLE! 🎮\nTu as trouvé le sens de la vie, de l'univers et du reste...";
                document.body.style.animation = 'glitch 0.3s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 2000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});
