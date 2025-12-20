export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-600 to-gray-900 text-transparent bg-clip-text mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our service
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 mb-6">
                By accessing and using Sommaire, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above,
                please do not use this service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-600 mb-6">
                Permission is granted to temporarily use Sommaire for personal, non-commercial
                transitory viewing only. This is the grant of a license, not a transfer of title,
                and under this license you may not:
              </p>
              <ul className="text-gray-600 mb-6 ml-6">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to decompile or reverse engineer any software contained on our service</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
              <p className="text-gray-600 mb-6">
                You are responsible for maintaining the confidentiality of your account and password.
                You agree not to use the service for any illegal purposes or to violate any laws in your jurisdiction.
                You must not upload content that infringes on intellectual property rights or contains harmful material.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content</h2>
              <p className="text-gray-600 mb-6">
                Our service allows you to upload and process PDF documents. You retain ownership
                of your content, but grant us permission to process it for summary generation.
                We do not claim ownership of your uploaded materials.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
              <p className="text-gray-600 mb-6">
                We strive to provide continuous service but do not guarantee that the service will be
                uninterrupted or error-free. We reserve the right to modify or discontinue the service
                with or without notice.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 mb-6">
                We may terminate or suspend your account immediately, without prior notice or liability,
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
              <p className="text-gray-600 mb-6">
                The information on this service is provided on an 'as is' basis. We disclaim all warranties,
                express or implied, including but not limited to warranties of merchantability, fitness for
                a particular purpose, and non-infringement.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations</h2>
              <p className="text-gray-600 mb-6">
                In no event shall Sommaire or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or
                inability to use the service, even if we have been notified orally or in writing of the possibility
                of such damage.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600 mb-6">
                These terms shall be interpreted and governed by the laws of the jurisdiction in which
                Sommaire operates, without regard to conflict of law provisions.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}