import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { doc, onSnapshot } from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CommentModal from '../../components/CommentModal';
import Post from '../../components/Post';
import Sidebar from '../../components/Sidebar';
import Widgets from '../../components/Widgets';
import { db } from '../../firebase';

export default function PostPage({ newsResult, userRandomResults }) {
   const router = useRouter();
   const { id } = router.query;
   const [post, setPost] = useState();

   useEffect(() => onSnapshot(doc(db, 'posts', id), (snapshot) => setPost(snapshot)), [db, id]);

   return (
      <div>
         <Head>
            <title>Post Page</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <main className='flex min-h-screen mx-auto'>
            {/* Sidebar */}
            <Sidebar />

            {/* Post */}
            <div className='xl:ml-[370px] border-r border-l border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
               <div className='flex items-center space-x-1 sticky py-2 px-3 top-0 z-50 bg-white border-b border-gray-200'>
                  <div className='hoverEffect' onClick={() => router.push('/')}>
                     <ArrowLeftIcon className='h-5' />
                  </div>
                  <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Tweet</h2>
               </div>

               <Post id={id} post={post} />
            </div>

            {/* Widgets */}
            <Widgets newsResult={newsResult.articles} userRandomResults={userRandomResults.results} />

            {/* Modal */}
            <CommentModal />
         </main>
      </div>
   );
}

export const getServerSideProps = async () => {
   // Whats happening section
   const newsResult = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json').then(
      (res) => res.json()
   );

   // Who to follow section
   const userRandomResults = await fetch('https://randomuser.me/api/?results=30&inc=name,login,picture').then(
      (res) => res.json()
   );

   return {
      props: {
         newsResult,
         userRandomResults,
      },
   };
};
