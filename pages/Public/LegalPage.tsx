
import React from 'react';
import Layout from '../../components/Layout';

const LegalPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-10 font-display">Legal Information</h1>
        
        <div className="space-y-12 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 font-display">Privacy Policy</h2>
            <p className="mb-4">At CouponWink, we take your privacy seriously. We only collect minimal information required to provide our service, such as your email address if you subscribe to our newsletter.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not sell your personal data to third parties.</li>
              <li>We use cookies to analyze site traffic and improve your experience.</li>
              <li>You can opt-out of communications at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 font-display">Terms of Service</h2>
            <p className="mb-4">By using CouponWink, you agree to the following terms:</p>
            <p>1. The promo codes provided are subject to change and are verified to the best of our ability, but we do not guarantee their validity.</p>
            <p>2. We may earn an affiliate commission when you use certain links on our site.</p>
            <p>3. You are responsible for verifying the final price at the merchant's checkout.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LegalPage;
