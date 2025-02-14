import React from "react";

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
					<img
						src="/onboarding-img.png"
						alt="Image"
						className="absolute inset-0 h-full w-full object-cover "
					/>
				</div>
			</div>
		</>
	);
};

export default layout;
