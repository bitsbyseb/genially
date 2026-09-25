// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const membersContainer = document.getElementById('members-container');
    const modal = document.getElementById('response-modal');
    const closeModal = document.querySelector('.close');
    const memberNameElement = document.getElementById('member-name');
    const responsesContainer = document.getElementById('responses-container');

    // Render member cards
    function renderMembers() {
        membersContainer.innerHTML = '';
        
        teamData.members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.innerHTML = `
                <h3>${member.name}</h3>
                <p>Click to view responses</p>
            `;
            
            memberCard.addEventListener('click', () => {
                openMemberModal(member);
            });
            
            membersContainer.appendChild(memberCard);
        });
    }

    // Open modal with member responses
    function openMemberModal(member) {
        memberNameElement.textContent = member.name;
        responsesContainer.innerHTML = '';
        
        // Create response items for each question
        teamData.questions.forEach((question, index) => {
            const responseItem = document.createElement('div');
            responseItem.className = 'response-item';
            responseItem.innerHTML = `
                <div class="question">${question}</div>
                <div class="answer">${member.responses[index]}</div>
            `;
            responsesContainer.appendChild(responseItem);
        });
        
        modal.style.display = 'block';
    }

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initialize the app
    renderMembers();
});