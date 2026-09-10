// Temporary local data used while Firestore access is unavailable.
// To revert: delete this file and remove the USE_DUMMY_DATA branches in
// book-data.ts and project-data.ts.
import type { IBook } from './book-data';
import type { IProject } from './project-data';
import type { IBlog } from './blog-data';

export const USE_DUMMY_DATA = true;

export const DUMMY_BOOKS: IBook[] = [
  {
    id: 'dummy-book-1',
    bookName: 'Atomic Habits',
    authorName: 'James Clear',
    note: 'Small changes repeated, and why willpower is the wrong lever.',
    description: 'An easy and proven way to build good habits and break bad ones.',
    image: 'https://picsum.photos/seed/atomic-habits/400/600'
  },
  {
    id: 'dummy-book-2',
    bookName: 'Deep Work',
    authorName: 'Cal Newport',
    note: 'A case for long, uninterrupted attention in a world built against it.',
    description: 'Rules for focused success in a distracted world.',
    image: 'https://picsum.photos/seed/deep-work/400/600'
  },
  {
    id: 'dummy-book-3',
    bookName: 'The Pragmatic Programmer',
    authorName: 'David Thomas & Andrew Hunt',
    note: 'The closest thing the trade has to a book of manners.',
    description: 'Your journey to mastery, covering timeless software craftsmanship lessons.',
    image: 'https://picsum.photos/seed/pragmatic-programmer/400/600'
  },
  {
    id: 'dummy-book-4',
    bookName: 'ആരാച്ചാർ (Aarachar)',
    authorName: 'K. R. Meera',
    note: 'A Kolkata family of hangmen, and the first woman among them.',
    description:
      'Chetna Grddha Mullick comes from a Kolkata family that has supplied hangmen for generations, and becomes the first woman among them. A novel about inheritance, spectacle, and who gets to decide a life is over.',
    image: 'https://picsum.photos/seed/aarachar/400/600'
  },
  {
    id: 'dummy-book-5',
    bookName: 'Pather Panchali',
    authorName: 'Bibhutibhushan Bandyopadhyay',
    note: 'Two children growing up poor in rural Bengal, told with enormous patience.',
    description:
      'Apu and his sister Durga growing up poor in a Bengal village, told with almost no plot and enormous patience. The book Satyajit Ray turned into his first film.',
    image: 'https://picsum.photos/seed/pather-panchali/400/600'
  },
  {
    id: 'dummy-book-6',
    bookName: 'India After Gandhi',
    authorName: 'Ramachandra Guha',
    note: 'The republic from 1947 onward, and the long argument over what it was for.',
    description:
      'A history of the republic from 1947 onward — partition, the states reorganisation, the Emergency, and the long argument over what the country was supposed to be.',
    image: 'https://picsum.photos/seed/india-after-gandhi/400/600'
  },
  {
    id: 'dummy-book-7',
    bookName: 'Les Misérables',
    authorName: 'Victor Hugo',
    note: 'Jean Valjean, an escaped convict, becomes the mayor of a town and the guardian of a young girl.',
    description:
      'Set in France during the early nineteenth century, the film tells the story of Jean Valjean who, while being hunted for decades by the ruthless policeman Javert after breaking parole, agrees to care for a factory worker\'s daughter. The story reaches resolution against the background of the June Rebellion of 1832.',
    image: 'https://picsum.photos/200/300/?blur'
  }
];

export const DUMMY_PROJECTS: IProject[] = [
  {
    id: 'dummy-project-1',
    projectName: 'Personal Website',
    description: 'An Angular + Firebase portfolio site showcasing projects and reading list.',
    image: 'https://picsum.photos/seed/personal-website/600/400',
    tags: ['Angular', 'Firebase', 'TypeScript'],
    links: { github: 'https://github.com', demo: 'https://example.com' }
  },
  {
    id: 'dummy-project-2',
    projectName: 'Task Tracker',
    description: 'A minimal task management app with drag-and-drop boards.',
    image: 'https://picsum.photos/seed/task-tracker/600/400',
    tags: ['React', 'Node.js'],
    links: { github: 'https://github.com' }
  },
  {
    id: 'dummy-project-3',
    projectName: 'Weather Dashboard',
    description: 'Realtime weather dashboard with location search and forecasts.',
    image: 'https://picsum.photos/seed/weather-dashboard/600/400',
    tags: ['Vue', 'API'],
    links: { demo: 'https://example.com' }
  },
  {
    id: 'dummy-project-4',
    projectName: 'Static Site Generator',
    description: 'A small generator that turns a folder of Markdown into a readable site.',
    image: 'https://picsum.photos/seed/static-site-generator/600/400',
    tags: ['Go', 'CLI'],
    links: { github: 'https://github.com' }
  }
];

export const DUMMY_BLOGS: IBlog[] = [
  {
    id: 'dummy-blog-1',
    title: 'Why I keep coming back to FOSS',
    excerpt:
      'Contributing to open source taught me more about writing maintainable code than any tutorial did. Notes on patches, review, and patience.',
    date: '2026-07-22',
    image: 'https://picsum.photos/seed/foss-notes/1200/675',
    body: [
      'The first patch I sent upstream was four lines long and took three weeks to land. I spent most of that time learning that the code was the easy part.',
      'Review in the open is a different discipline. You are not defending a decision to someone who already shares your context; you are explaining it to a stranger who will maintain it after you have moved on.',
      'That constraint has done more for the way I write software than any amount of reading about clean architecture. It forces the question: will this still be obvious to someone in a year?'
    ]
  },
  {
    id: 'dummy-blog-2',
    title: 'Reading Malayalam fiction as an adult',
    excerpt:
      'Coming back to the language I grew up with, after years of reading mostly in English, and what got lost in between.',
    date: '2026-06-09',
    body: [
      'I stopped reading in Malayalam somewhere around school and did not notice for the better part of a decade. Picking it back up felt like meeting someone I used to know well.',
      'The vocabulary came back faster than the rhythm did. There is a cadence to good Malayalam prose that translation flattens, and I had forgotten how much of the pleasure lives there.'
    ]
  },
  {
    id: 'dummy-blog-3',
    title: 'Two years in, and what I got wrong',
    excerpt:
      'The things I was confident about at the start of my first engineering job, and how most of them turned out to be wrong.',
    date: '2026-04-18',
    image: 'https://picsum.photos/seed/two-years-in/1200/675',
    body: [
      'I arrived convinced that the hard part of the job was writing the code. Two years later the code is the part I worry about least.',
      'What actually takes the time: understanding why the previous decision was made, finding out who depends on the thing you are about to change, and writing it down so the next person does not repeat the archaeology.'
    ]
  },
  {
    id: 'dummy-blog-4',
    title: 'On volleyball and reading a play',
    excerpt:
      'Court sports reward anticipation over reaction. A short piece on what that has in common with debugging.',
    date: '2026-02-27',
    body: [
      'In volleyball you cannot wait to see where the ball goes. By the time you have seen it, the point is over. You read the setter, the approach, the angle of the shoulders, and you commit.',
      'Debugging rewards the same instinct. The people who are fast at it are not reading more of the log than you are; they are reading the shape of the failure and committing to a guess early.'
    ]
  },
  {
    id: 'dummy-blog-5',
    title: 'Notes on machine learning, three years later',
    excerpt:
      'Looking back at my honours work and which parts of it actually held up once I started shipping software.',
    date: '2026-01-15',
    image: 'https://picsum.photos/seed/ml-notes/1200/675',
    body: [
      'My honours work was a model that performed well on a dataset I had cleaned myself. I understood the maths and almost nothing about where the data came from.',
      'The part that held up was not the modelling. It was the habit of asking what the numbers are actually measuring, which turns out to be most of the job in any field.'
    ]
  }
];
