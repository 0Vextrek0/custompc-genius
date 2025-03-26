
import { useState } from "react";
import { motion } from "framer-motion";
import { components, componentTypes, Component, getComponentsByType, calculateTotalPrice } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, ChevronRight, Cpu, Save, Search, Star, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ConfiguratorPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(componentTypes[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component | null>>(
    Object.fromEntries(componentTypes.map((type) => [type.id, null]))
  );
  const [buildName, setBuildName] = useState("");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  // Get filtered components for the current active tab
  const getFilteredComponents = () => {
    const typeComponents = getComponentsByType(activeTab);
    if (!searchQuery) return typeComponents;
    
    const query = searchQuery.toLowerCase();
    return typeComponents.filter(
      (component) =>
        component.name.toLowerCase().includes(query) ||
        component.brand.toLowerCase().includes(query)
    );
  };

  // Handle component selection
  const selectComponent = (component: Component) => {
    setSelectedComponents({
      ...selectedComponents,
      [component.type]: component,
    });
    
    toast({
      title: "Component Added",
      description: `${component.name} has been added to your configuration.`,
      variant: "default",
    });
  };

  // Handle component removal
  const removeComponent = (componentType: string) => {
    setSelectedComponents({
      ...selectedComponents,
      [componentType]: null,
    });
    
    toast({
      title: "Component Removed",
      description: "Component has been removed from your configuration.",
      variant: "default",
    });
  };

  // Calculate the total price of the build
  const totalPrice = calculateTotalPrice(
    Object.values(selectedComponents).filter((c): c is Component => c !== null)
  );

  // Save the current build
  const saveBuild = () => {
    if (!buildName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your build.",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would typically save to a database
    // For now, we just show a success message
    toast({
      title: "Build Saved",
      description: `Your build "${buildName}" has been saved to your profile.`,
      variant: "default",
    });
    
    setIsSaveDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-2"
      >
        <h1 className="text-3xl font-bold">PC Configurator</h1>
        <p className="text-muted-foreground">
          Build your custom PC by selecting components from each category
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-6">
        {/* Component Selection Area */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList className="w-auto">
                {componentTypes.map((type) => (
                  <TabsTrigger key={type.id} value={type.id} className="min-w-[100px]">
                    {type.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="relative w-60">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={`Search ${componentTypes.find((t) => t.id === activeTab)?.name}...`}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {componentTypes.map((type) => (
              <TabsContent key={type.id} value={type.id} className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredComponents().map((component) => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      <Card 
                        className={`overflow-hidden hover-scale ${
                          selectedComponents[component.type]?.id === component.id 
                            ? "ring-2 ring-primary" 
                            : ""
                        }`}
                      >
                        {selectedComponents[component.type]?.id === component.id && (
                          <div className="absolute top-2 right-2 z-10">
                            <Badge className="bg-primary">Selected</Badge>
                          </div>
                        )}
                        <div className="h-40 bg-muted flex items-center justify-center p-4">
                          <img
                            src={component.image}
                            alt={component.name}
                            className="h-full object-contain"
                          />
                        </div>
                        <CardHeader className="py-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{component.name}</CardTitle>
                              <CardDescription>{component.brand}</CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center justify-end mb-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                                <span className="text-sm">{component.rating}</span>
                              </div>
                              <span className="font-bold">${component.price}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="py-0">
                          <div className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {component.description}
                          </div>
                          <div className="space-y-1">
                            {Object.entries(component.specs).slice(0, 3).map(([key, value]) => (
                              <div key={key} className="grid grid-cols-2 text-xs">
                                <span className="font-medium capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}:
                                </span>
                                <span className="text-muted-foreground truncate">{value}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-3">
                          <Button 
                            className="w-full"
                            variant={selectedComponents[component.type]?.id === component.id ? "outline" : "default"}
                            onClick={() => selectComponent(component)}
                          >
                            {selectedComponents[component.type]?.id === component.id ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Selected
                              </>
                            ) : (
                              "Select"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Current Build Summary */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Build</CardTitle>
                <CardDescription>
                  Select components from each category to complete your build
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {componentTypes.map((type) => {
                  const component = selectedComponents[type.id];
                  return (
                    <div
                      key={type.id}
                      className={`p-3 rounded-lg ${
                        component ? "bg-secondary" : "bg-muted/50 border border-dashed"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-sm">{type.name}</div>
                        {component && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => removeComponent(type.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        )}
                      </div>
                      {component ? (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                              <img
                                src={component.image}
                                alt={component.name}
                                className="w-8 h-8 object-contain"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium truncate">{component.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {component.brand} | ${component.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="mt-2 text-sm text-muted-foreground flex items-center space-x-1 cursor-pointer"
                          onClick={() => setActiveTab(type.id)}
                        >
                          <span>Select a {type.name.toLowerCase()}</span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  );
                })}

                <Separator />

                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {Object.values(selectedComponents).filter(Boolean).length} of{" "}
                    {componentTypes.length} components selected
                  </div>
                  <Badge
                    variant={
                      Object.values(selectedComponents).every(Boolean)
                        ? "default"
                        : "secondary"
                    }
                  >
                    {Object.values(selectedComponents).every(Boolean)
                      ? "Complete"
                      : "Incomplete"}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Build
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save Your Build</DialogTitle>
                      <DialogDescription>
                        Give your build a name to save it to your profile.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="build-name">Build Name</Label>
                          <Input
                            id="build-name"
                            placeholder="My Awesome PC Build"
                            value={buildName}
                            onChange={(e) => setBuildName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="font-medium text-sm">Components</div>
                          <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                            {Object.entries(selectedComponents)
                              .filter(([_, component]) => component !== null)
                              .map(([type, component]) => (
                                <div key={type} className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {componentTypes.find((t) => t.id === type)?.name}:
                                  </span>
                                  <span className="font-medium">{component?.name}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">${totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={saveBuild}>Save Build</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  Export Parts List
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorPage;
