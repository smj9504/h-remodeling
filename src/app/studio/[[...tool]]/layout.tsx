export const metadata = {
  title: 'H Remodeling Studio',
  description: 'Portfolio Content Management System',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
