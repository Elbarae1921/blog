import Image from 'next/image';
import Link from 'next/link';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <Link href="/">
        <div className="relative w-12 h-12 block mx-auto mb-4">
          <Image
            src="https://elbarae.me/blog-icon-dark.png"
            alt="Elbarae"
            fill
            style={{ objectFit: 'contain' }}
            className="dark:hidden"
          />
          <Image
            src="https://elbarae.me/blog-icon.png"
            alt="Elbarae"
            fill
            style={{ objectFit: 'contain' }}
            className="hidden dark:block"
          />
        </div>
        <p className="text-2xl dark:text-white text-center">{name}</p>
      </Link>
    </header>
  );
}
