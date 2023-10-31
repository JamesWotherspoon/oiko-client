# React Client Roadmap for Smart Saver

## Version 1.0.0

### Milestone 1: Project Initialization and Setup
- [x] Setup project using `create-react-app`.
- [x] Define the project structure
        - assets/
        -- images/
        -- fonts/
        - features
        - styles/
        - utils/
        -- api.js
- [x] Implement a basic SCSS setup
- [x] Setup linting with ESLint
- [x] Configure environment variables for development and production.
- [x] Decide on a primary design framework - Matrial UI
- [x] Decide on a form library - React Hook form

### Milestone 6: User Authentication Flow
- [x] Develop the authentication components; Login, Register and auth page
- [x] Create auth context
- [ ] Implement protected routes.
- [ ] Apply see and hide password
- [ ] Ensure password is repeated for reg

### Milestone 2: Basic User Interface
- [ ] Design the primary layout components (Header, Footer, Main Content).
- [ ] Develop static versions of the main pages (Homepage, About, Contact).
- [ ] Setup React Router for navigation.

### Milestone 3: State Management Basics
- [ ] Evaluate state needs and decide on Context API/Redux/MobX.
- [ ] Set up the primary global state structure.
- [ ] Implement mock user authentication (static data).

### Milestone 4: Dynamic Data Rendering
- [ ] Create reusable component structures for lists, cards, etc.
- [ ] Display mock data in components.
- [ ] Introduce prop-types or TypeScript for type checking.

### Milestone 5: Integration with API
- [ ] Setup API utilities or services for reusable API calls.
- [ ] Load and display mock data from the backend or local JSON.
- [ ] Introduce loading states using spinners or placeholders.

### Milestone 7: Advanced Interactivity and State
- [ ] Introduce forms for user input (e.g., transaction creation, profile editing).
- [ ] Validate form inputs and display feedback.
- [ ] Connect forms to the backend and handle data submission.
- [ ] Implement advanced state scenarios (e.g., modals, popups).

### Milestone 8: Styling and Responsiveness
- [ ] Ensure components are styled consistently.
- [ ] Make the application mobile-responsive.
- [ ] Introduce themes or appearance toggles (light/dark mode).
- [ ] Include copyright and favicon
- [ ] Horiizontal loader across top
- [ ] collapsable navbar to just icons

### Milestone 9: Performance and Optimization
- [ ] Utilize React's performance tools to profile components.
- [ ] Implement React.lazy and Suspense for code-splitting.
- [ ] Optimize re-renders using React.memo and careful state management.

### Milestone 10: Testing and Debugging
- [ ] Introduce unit testing with Jest and React Testing Library.
- [ ] Write tests for critical components and functionality.
- [ ] Use debugging tools to identify and fix any potential issues.

### Milestone 11: Deployment
- [ ] Build and optimize the production version of the React app.
- [ ] Deploy to a hosting platform (e.g., Netlify, Vercel, AWS Amplify).
- [ ] Ensure secure HTTP (HTTPS) using SSL/TLS.

## Version 1.1.0

### User Experience Enhancements
- [ ] Implement onboarding tutorials for new users.
- [ ] Add user profile customization options.
- [ ] Allow users to customize app themes or layouts.
- [ ] Visualize transaction data (e.g., using charting libraries like Chart.js or D3.js).
- [ ] Explore animations with libraries like Framer Motion.

### Performance and Maintenance
- [ ] Implement code splitting for lazy loading to improve initial load times.
- [ ] Use service workers for offline capabilities or PWA functionality.

### Advanced Features
- [ ] Implement infinite scrolling or pagination where required.
- [ ] Integrate third-party APIs or widgets (e.g., OAuth).
- [ ] Setup automatic deployments with CI/CD pipelines.

### Feedback and Iteration
- [ ] Gather user feedback on UX/UI.
- [ ] Iterate on the design and functionality based on feedback.

