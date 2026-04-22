# Invoice Management Application

I built this fully responsive, accessible, and feature-rich Invoice Management application using React. It allows users to manage their invoices (CRUD operations), filter them by status, and toggle between dark and light themes.

## 🚀 Setup Instructions

If you'd like to run my application locally, just follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- `npm` (comes bundled with Node.js)

### Installation
1. **Clone or Download the repository.**
2. **Navigate to the project directory:**
   ```bash
   cd "Invoice app"
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Open in Browser:**
   Visit `http://localhost:5173` to view the application!

---

## 🏗️ Architecture Explanation

I built this application using **React**, focusing heavily on simplicity, modularity, and keeping the codebase maintainable.

- **State Management (Context API)**: Instead of reaching for a heavy library like Redux, I decided to manage global state entirely through React's native Context API (`InvoiceContext` and `ThemeContext`). 
  - I used the `useReducer` pattern inside `InvoiceContext` to keep the CRUD logic predictable and organized.
  - I set up `useEffect` hooks to automatically sync state to `localStorage`, which acts as my persistence layer.
- **Component Structure**:
  - `App.jsx`: This is my root component. It orchestrates the views (swapping between `InvoiceList` and `InvoiceDetails`) and handles the global modals.
  - `InvoiceForm.jsx`: A dynamic form I built to handle both creating new invoices and editing existing ones. I made sure it calculates the financial totals instantly on the fly.
  - `ModalWrapper.jsx`: I created this reusable abstraction specifically to handle all the accessibility standards across my overlays in one place.
- **Styling**: I chose to build everything using Vanilla CSS and CSS Custom Properties (variables) so I could handle theme switching efficiently without needing styled-components or Tailwind.

---

## ⚖️ Trade-offs

While building this, I had to make a few technical compromises:

1. **LocalStorage vs. Backend Database**:
   - *Decision*: I chose to persist data via the browser's `localStorage` instead of setting up a Node.js/Express backend.
   - *Trade-off*: This drastically reduced deployment complexity and server costs. The compromise is that data won't sync across multiple devices or browsers for the user.
2. **Custom Accessibility Implementations vs. External Libraries**:
   - *Decision*: I wrote a custom `ModalWrapper` to handle Focus Trapping and Escape-key listeners.
   - *Trade-off*: Writing a custom solution kept my bundle size tiny and avoided the bloat of massive external component libraries like Radix UI. However, it meant I had to manually handle edge cases, like querying for focusable elements myself.
3. **Vanilla CSS vs. CSS Frameworks**:
   - *Decision*: I used pure CSS over Tailwind CSS.
   - *Trade-off*: This allowed me to achieve pixel-perfect replication of the design aesthetics without wrestling with pre-defined utility classes, but it did result in slightly larger, separate stylesheet files.

---

## ♿ Accessibility Notes

I put a strong emphasis on meeting WCAG (Web Content Accessibility Guidelines) AA standards throughout this project.

- **Semantic HTML & Forms**: I made sure all my forms are fully semantic. My inputs have explicitly defined `id` attributes that strictly map to their `<label htmlFor="...">` counterparts. For dynamic inputs (like the item rows), I utilized `aria-label` attributes for screen readers.
- **Modal Focus Trapping**: I built the custom `ModalWrapper` to actively trap the user's `Tab` navigation strictly within the bounds of the active modal overlay. This ensures keyboard users won't accidentally interact with hidden background elements.
- **Keyboard Navigation**: You can press `Escape` to universally close any open form or delete-confirmation dialog. Opening a modal automatically shifts the keyboard focus to its first interactive element.
- **Color Contrast**: I manually adjusted the base colors provided for the light theme (like changing the secondary text to `#5A628B`) to ensure a minimum 4.5:1 contrast ratio against the white background. This fully passes WCAG AA contrast tests.
- **Native Form Validation**: I leveraged HTML5 constraint validation (`required` attributes) for better integration with screen readers and native browser tooltips.

---

## ✨ Improvements Beyond Requirements

I decided to add a few extra touches that weren't strictly required:

- **Intelligent Draft Logic**: I enforced strict HTML5 form validation when clicking "Save & Send", but I intentionally bypassed validation (using the `formNoValidate` attribute) when clicking "Save as Draft", allowing users to save incomplete work without getting yelled at by the browser.
- **Real-time Financial Calculations**: The `InvoiceForm` handles item array manipulations intelligently. Instead of waiting for a form submission or relying on a messy `useEffect`, changing an item's price or quantity triggers an immediate calculation update inline, keeping the component perfectly pure.
- **Reusable Modal Architecture**: Instead of duplicating overlay logic inside the Form component and the Delete Confirmation component, I built a single `ModalWrapper` that handles the DOM events and CSS animations for both. This severely reduced duplicate code.
