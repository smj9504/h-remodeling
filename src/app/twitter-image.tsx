import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'H Remodeling - Kitchen, Bathroom, Flooring & Deck Experts in DMV';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(234, 179, 8, 0.15) 0%, transparent 50%)`,
            display: 'flex',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #3b82f6 0%, #eab308 100%)',
            display: 'flex',
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
              }}
            >
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>H</span>
            </div>
            <span
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: '-1px',
              }}
            >
              Remodeling
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '32px',
              color: '#94a3b8',
              marginBottom: '40px',
              display: 'flex',
            }}
          >
            Transform Your Home with Expert Craftsmanship
          </div>

          {/* Services */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Kitchen', 'Bathroom', 'Flooring', 'Decking'].map((service) => (
              <div
                key={service}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  padding: '12px 28px',
                  fontSize: '22px',
                  color: 'white',
                  display: 'flex',
                }}
              >
                {service}
              </div>
            ))}
          </div>

          {/* Location Badge */}
          <div
            style={{
              marginTop: '50px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#eab308',
              fontSize: '24px',
            }}
          >
            <span>📍</span>
            <span>Serving Maryland & Virginia</span>
          </div>
        </div>

        {/* Bottom contact info */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            gap: '40px',
            color: '#64748b',
            fontSize: '18px',
          }}
        >
          <span>📞 (703) 585-9517</span>
          <span>🌐 h-remodeling.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

