document.addEventListener('DOMContentLoaded', () => {
    const rawInput = document.getElementById('rawInput');
    const enhancedOutput = document.getElementById('enhancedOutput');
    const enhanceBtn = document.getElementById('enhanceBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const charCount = document.getElementById('charCount');
    
    const roleSelect = document.getElementById('roleSelect');
    const toneSelect = document.getElementById('toneSelect');
    const formatSelect = document.getElementById('formatSelect');
    const toast = document.getElementById('toast');

    // Character counter update
    rawInput.addEventListener('input', () => {
        const len = rawInput.value.length;
        charCount.textContent = `${len} chars`;
    });

    // Forge Prompt Logic
    enhanceBtn.addEventListener('click', () => {
        const userPrompt = rawInput.value.trim();
        if (!userPrompt) {
            alert('Please enter a raw prompt in the left panel first!');
            rawInput.focus();
            return;
        }

        const role = roleSelect.value;
        const tone = toneSelect.value;
        const format = formatSelect.value;

        // Structured Master Prompt Template Generation
        const structuredPrompt = 
`### ROLE & CONTEXT
You are acting as an expert ${role}. Your goal is to provide accurate, production-ready, and high-performance solutions based on the requirements provided below.

### CORE OBJECTIVE / TASK
${userPrompt}

### GUIDELINES & CONSTRAINTS
- Tone & Style: Adopt a ${tone} approach.
- Code Quality: Ensure best practices, modular organization, performance optimization, and proper commenting where necessary.
- Error Handling: Anticipate edge cases and provide secure handling mechanisms.

### EXPECTED OUTPUT FORMAT
Deliver the final response formatted strictly as: ${format}.`;

        enhancedOutput.value = structuredPrompt;
    });

    // Reset Workbench
    clearBtn.addEventListener('click', () => {
        rawInput.value = '';
        enhancedOutput.value = '';
        charCount.textContent = '0 chars';
        roleSelect.selectedIndex = 0;
        toneSelect.selectedIndex = 0;
        formatSelect.selectedIndex = 0;
    });

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        if (!enhancedOutput.value) {
            alert('No enhanced prompt available to copy!');
            return;
        }

        navigator.clipboard.writeText(enhancedOutput.value).then(() => {
            showToast();
        });
    });

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
});