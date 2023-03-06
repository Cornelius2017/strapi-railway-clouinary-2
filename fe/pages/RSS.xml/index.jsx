import { GetServerSideProps } from 'next';

const SITE_URL = process.env.API_URL;

export const GetPost = async (collection) => {
	const data = await fetch(`${SITE_URL}${collection}`, {
	  method: "GET",
	});
	const res = await data.json();
	
	return res;
};


export const getServerSideProps = async (ctx) => {
    
}

export default () => {};