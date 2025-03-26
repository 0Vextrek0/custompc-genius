
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, BarChart3, Save, Package, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const features = [
    {
      icon: <Cpu className="h-10 w-10 text-primary" />,
      title: "Browse Components",
      description: "Access a vast database of PC components with detailed specifications.",
      link: "/components",
      color: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: <Package className="h-10 w-10 text-primary" />,
      title: "Recommended Builds",
      description: "Explore curated PC builds for different budgets and use cases.",
      link: "/builds",
      color: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      icon: <Settings className="h-10 w-10 text-primary" />,
      title: "Custom Configurator",
      description: "Build your perfect PC from scratch with our easy-to-use configurator.",
      link: "/configurator",
      color: "bg-green-50 dark:bg-green-950/30",
    },
    {
      icon: <Save className="h-10 w-10 text-primary" />,
      title: "Save Your Builds",
      description: "Store and manage your custom PC configurations in your profile.",
      link: "/profile",
      color: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Compare Builds",
      description: "Compare multiple builds side by side to find the perfect match.",
      link: "/compare",
      color: "bg-red-50 dark:bg-red-950/30",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Find Components",
      description: "Search for specific components and view detailed information.",
      link: "/components",
      color: "bg-cyan-50 dark:bg-cyan-950/30",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/30 -z-10 rounded-3xl" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
              Design Your Dream PC
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Build The Perfect PC For{" "}
              <span className="relative">
                <span className="relative z-10">Your Needs</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 rounded"></span>
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Customize, configure, and compare PC builds with our powerful, easy-to-use
              platform. Take control of your next PC build experience.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="rounded-md hover-lift">
                <Link to="/configurator">
                  Start Building <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-md hover-lift">
                <Link to="/builds">View Recommended Builds</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-video bg-gradient-to-tr from-primary to-primary/50 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587202372775-e229f172b9d7')] bg-cover bg-center mix-blend-overlay opacity-70"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full mb-2">
                  Gaming Build
                </span>
                <h3 className="text-white text-xl font-medium">Ultimate Gaming Rig 2023</h3>
                <p className="text-white/80 text-sm mt-1">Starting at $1,299</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need To Build Your PC</h2>
          <p className="text-muted-foreground">
            Our platform offers all the tools you need to create, save, and compare your custom PC builds
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`${feature.color} p-6 rounded-xl border border-primary/5 hover-scale`}
            >
              <div className="p-3 inline-block rounded-lg bg-white/90 dark:bg-black/30 mb-4 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Link
                to={feature.link}
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-8 md:p-12 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream PC?</h2>
          <p className="text-white/80 mb-8">
            Join thousands of PC enthusiasts who are creating their perfect builds. Start your journey today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="rounded-md hover-lift">
              <Link to="/configurator">
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-md hover-lift bg-transparent text-white hover:bg-white/10 border-white/20">
              <Link to="/auth">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
