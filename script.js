
  // Mobile nav
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // Product details toggle
  document.querySelectorAll('.details-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const more = btn.closest('.product-body').querySelector('.product-more');
      more.classList.toggle('open');
      btn.textContent = more.classList.contains('open') ? 'Details −' : 'Details +';
    });
  });

  // Sends a form's data to Formsubmit.co so submissions actually arrive by email
  function sendFormEmail(form, toastId, submitBtn) {
    const endpoint = 'https://formsubmit.co/ajax/info@exariste.com';
    const originalLabel = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        document.getElementById(toastId).classList.add('show');
        form.reset();
      })
      .catch(() => {
        alert('Sorry, something went wrong sending your message. Please email us directly at info@exariste.com.');
      })
      .finally(() => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
      });
  }

  // Dealer form
  const dealerForm = document.getElementById('dealerForm');
  if (dealerForm) {
    dealerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendFormEmail(dealerForm, 'dealerToast', dealerForm.querySelector('button[type="submit"]'));
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendFormEmail(contactForm, 'contactToast', contactForm.querySelector('button[type="submit"]'));
    });
  }

  // Order form (Shop Now)
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('product') || '';
    const productField = document.getElementById('oProduct');
    const summaryName = document.getElementById('orderSummaryName');
    if (productField) productField.value = productName;
    if (summaryName && productName) summaryName.textContent = productName;
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendFormEmail(orderForm, 'orderToast', orderForm.querySelector('button[type="submit"]'));
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Ingredients index (signature interaction)
  const strip = document.getElementById('indexStrip');
  const card = document.getElementById('indexCard');
  if (strip && card) {
    const ingredients = [
      { leaf:'🌵', name:'Aloe Vera', benefit:'Soothes and hydrates skin instantly, calming irritation while locking in moisture for a soft, supple feel.', found:['Glow Bloom','Fresh Dew'] },
      { leaf:'🌿', name:'Neem', benefit:'A natural antibacterial that helps clear blemishes and keep skin balanced, especially for oily or acne-prone types.', found:['Deep Fresh'] },
      { leaf:'🌼', name:'Turmeric', benefit:'Brightens dull skin and evens tone, prized for generations as a natural glow-enhancer.', found:['Glow Bloom','Deep Fresh'] },
      { leaf:'🍯', name:'Honey', benefit:'A humectant that draws in moisture, leaving skin nourished, soft, and naturally radiant.', found:['Glow Bloom','Aqua Bloom'] },
      { leaf:'🥥', name:'Coconut Oil', benefit:'Deeply conditions hair and skin, reducing dryness and adding lasting softness and shine.', found:['Silk Shine','Fresh Dew'] },
      { leaf:'🌾', name:'Vitamin E', benefit:'An antioxidant that protects skin from daily stress while supporting a smoother, healthier texture.', found:['Silk Shine','Aqua Bloom'] },
      { leaf:'💧', name:'Glycerin', benefit:"A gentle humectant that keeps skin hydrated for hours, core to Veloura's daily-use formulas.", found:['Fresh Dew','Deep Fresh'] },
      { leaf:'⚫', name:'Charcoal', benefit:'Draws out impurities and excess oil for a deep, refreshing clean without over-drying.', found:['Deep Fresh'] },
    ];
    function renderIndexCard(i) {
      const ing = ingredients[i];
      card.innerHTML = `
        <div class="big-leaf">${ing.leaf}</div>
        <div>
          <h3>${ing.name}</h3>
          <p>${ing.benefit}</p>
          <div class="found-in">${ing.found.map(f => `<span>${f}</span>`).join('')}</div>
        </div>`;
    }
    ingredients.forEach((ing, i) => {
      const chip = document.createElement('div');
      chip.className = 'index-chip' + (i === 0 ? ' active' : '');
      chip.innerHTML = `<span class="leaf">${ing.leaf}</span><span>${ing.name}</span>`;
      chip.addEventListener('click', () => {
        document.querySelectorAll('.index-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderIndexCard(i);
      });
      strip.appendChild(chip);
    });
    renderIndexCard(0);
  }
