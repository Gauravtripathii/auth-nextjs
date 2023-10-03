export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="text-4xl m-2">Profile</h1>
            <p>User Profile <span className="bg-orange-500 text-black rounded p-2">{params.id}</span></p>
        </div>
    )
}