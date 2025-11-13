
// Mock Data
const mockUsers = [
  { id: 1, username: 'johndoe', fullName: 'John Doe', email: 'john@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', bio: 'Tech enthusiast and writer' },
  { id: 2, username: 'janesmit', fullName: 'Jane Smith', email: 'jane@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', bio: 'Designer & creative thinker' },
  { id: 3, username: 'alexchen', fullName: 'Alex Chen', email: 'alex@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', bio: 'Developer and blogger' }
];

const mockPosts = [
  {
    id: 1,
    title: 'Getting Started with React Hooks',
    content: 'React Hooks have revolutionized the way we write React components. In this comprehensive guide, we\'ll explore useState, useEffect, and custom hooks to build better applications...',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    author: mockUsers[0],
    createdAt: '2024-11-10',
    likes: 42,
    comments: 12
  },
  {
    id: 2,
    title: 'The Future of Web Design',
    content: 'Web design is evolving rapidly with new technologies and design patterns. Let\'s explore the latest trends including glassmorphism, 3D elements, and micro-interactions...',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
    author: mockUsers[1],
    createdAt: '2024-11-09',
    likes: 38,
    comments: 8
  },
  {
    id: 3,
    title: 'Building Scalable APIs',
    content: 'Learn how to design and build scalable REST APIs that can handle millions of requests. We\'ll cover best practices, caching strategies, and performance optimization...',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    author: mockUsers[2],
    createdAt: '2024-11-08',
    likes: 56,
    comments: 15
  },
  {
    id: 4,
    title: 'Mastering Tailwind CSS',
    content: 'Tailwind CSS has become one of the most popular utility-first CSS frameworks. Discover advanced techniques and best practices for building beautiful interfaces...',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
    author: mockUsers[0],
    createdAt: '2024-11-07',
    likes: 29,
    comments: 6
  },
  {
    id: 5,
    title: 'Understanding TypeScript',
    content: 'TypeScript brings type safety to JavaScript, making your code more robust and maintainable. Let\'s dive deep into advanced TypeScript features and patterns...',
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=400&fit=crop',
    author: mockUsers[1],
    createdAt: '2024-11-06',
    likes: 44,
    comments: 10
  },
  {
    id: 6,
    title: 'Modern JavaScript Features',
    content: 'ES2024 brings exciting new features to JavaScript. Explore optional chaining, nullish coalescing, and other modern syntax that will improve your code...',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
    author: mockUsers[2],
    createdAt: '2024-11-05',
    likes: 51,
    comments: 14
  }
];


export {mockPosts, mockUsers}
