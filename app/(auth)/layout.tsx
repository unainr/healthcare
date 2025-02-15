import React from "react";
import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className="grid min-h-svh lg:grid-cols-2">
				<div className="flex flex-col gap-4 p-6 md:p-10">
					<div className="flex flex-1 items-center justify-center">
						<div className="w-full max-w-full">{children}</div>
					</div>
				</div>
				<div className="relative hidden bg-muted lg:block">
					<Image
						src="https://images.unsplash.com/photo-1527613426441-4da17471b66d"
						alt="Image"
						className="absolute inset-0 h-full w-full object-cover"
						fill
					/>
				</div>
			</div>
		</>
	);
};

export default layout;
