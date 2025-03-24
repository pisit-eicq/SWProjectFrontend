import React from 'react';
import Link from 'next/link';

/**
 * Example Usage:
 * 
 * The `Breadcrumb` component is used to display a navigational breadcrumb trail,
 * which helps users understand their location within the application hierarchy.
 * 
 * Example:
 * 
 * import Breadcrumb from './Breadcrum';
 * 
 * const ExamplePage = () => {
 *   const breadcrumbItems = [
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Electronics', href: '/products/electronics' },
 *     { label: 'Smartphones' },
 *   ];
 * 
 *   return (
 *     <div>
 *       <Breadcrumb items={breadcrumbItems} />
 *       <h1 className="text-2xl font-bold">Smartphones</h1>
 *     </div>
 *   );
 * };
 * 
 * export default ExamplePage;
 * 
 * Props:
 * - `items`: An array of breadcrumb items, where each item has:
 *   - `label` (string): The text to display for the breadcrumb item.
 *   - `href` (string, optional): The URL to navigate to when the breadcrumb item is clicked.
 * 
 * Notes:
 * - If `href` is not provided for an item, it will be rendered as plain text.
 * - The component automatically adds a separator (`/`) between breadcrumb items.
 */



interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="text-sm font-sans text-color-base-700">
      <ol className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
                <a href={item.href} className="text-color-base-700 hover:text-color-base-900 transition-colors">
                  {item.label}
                </a>
            ) : (
              <span className="text-color-base-500">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-color-base-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;