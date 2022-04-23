import { colord } from 'colord';

type LogoProps = {
  color?: string;
};

export default function Logo({ color }: LogoProps) {
  let color1 = '#B8E63B';
  let color2 = '#E70258';
  let color3 = '#880055';
  let color4 = '#FAF100';
  let color5 = '#00A8FF';
  let color6 = 'currentColor';

  if (color) {
    const c = colord(color);
    color1 = c.toHex();
    color2 = c.toHex();
    color3 = c.toHex();
    color4 = c.toHex();
    color5 = c.toHex();
    color6 = c.alpha(0.4).toHex();
  }
  const icon = (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="3.89189" height="1.94595" rx="0.972973" fill={color1} />
      <rect x="6.08105" width="11.9189" height="1.94595" rx="0.972973" fill={color6} />
      <rect x="1.70276" y="3.64868" width="8.02703" height="1.94595" rx="0.972973" fill={color6} />
      <rect x="11.9189" y="3.64868" width="6.08108" height="1.94595" rx="0.972973" fill={color2} />
      <rect x="3.89185" y="7.78369" width="3.64865" height="1.94595" rx="0.972973" fill={color3} />
      <rect x="9.97296" y="7.78369" width="8.02703" height="1.94595" rx="0.972973" fill={color6} />
      <rect x="1.94592" y="11.9189" width="10.2162" height="1.94595" rx="0.972973" fill={color6} />
      <rect x="14.1081" y="11.9189" width="3.89189" height="1.94595" rx="0.972973" fill={color4} />
      <rect x="11.9189" y="16.054" width="6.08108" height="1.94595" rx="0.972973" fill={color6} />
      <rect y="16.054" width="10.2162" height="1.94595" rx="0.972973" fill={color5} />
    </svg>
  );

  return (
    <>
      {icon}
      <span style={{ color: color5 }}>VS Code</span>&nbsp;
      <span className="logo-secondary" style={{ opacity: color ? 0.8 : 1 }}>
        Themes
      </span>
    </>
  );
}
