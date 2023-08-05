# Notenext

Notenext is a web application that allows users to create and manage their notes in a private or public setting. The project is built using Prisma, MongoDB, Next.js, and TypeScript, providing a secure and efficient platform for users to organize and share their thoughts.

![Notenext Screenshot](https://notenext.vercel.app/logo.png)

## Live Demo

You can access the live demo of Notenext at [https://notenext.vercel.app](https://notenext.vercel.app)

## Features

- User authentication: Users can log in to Notenext using their credentials or Google accounts, thanks to the NextAuth.js integration.
- Private and Public Notes: Users can create and save notes privately for personal use or choose to share them with the public.
- Notes Feed: The public notes are displayed in the 'Notes Feed' section, allowing users to explore and read notes from others even without logging in.
- Secure Data Storage: Notenext uses MongoDB as its database, ensuring robust data storage and security.
- Responsive Design: The application is built with responsive design principles to provide a seamless experience across various devices.

## Technologies Used

- ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
- ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
- ![NextAuth.js](https://img.shields.io/badge/-NextAuth.js-000000?style=flat-square&logo=next.js&logoColor=white)

## Getting Started

To run Notenext locally, follow these steps:

1. Clone the GitHub repository:

```bash
git clone https://github.com/blackipie/Notenext.git
cd Notenext
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following environment variables with appropriate values:

```bash
MONGODB_URI=YOUR_MONGODB_URI
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
NEXT_PUBLIC_SITE_URL=YOUR_PUBLIC_SITE_URL
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open your browser and go to `http://localhost:3000` to access Notenext locally.

## Contributions

Contributions to Notenext are welcome! If you find any issues or have improvements to suggest, please create a pull request or open an issue on the GitHub repository.

## Contact

If you have any questions or suggestions regarding Notenext, feel free to reach out to the developer:

- Developer: Shafin
- Email: <xhafin@gmail.com>

## License

The project is licensed under the [MIT License](https://github.com/blackipie/notenext/blob/main/LICENSE).

---
This README template is provided as a starting point to introduce the Notenext project to potential users and contributors. Feel free to modify it with specific details about the project and its functionality. Happy coding!
