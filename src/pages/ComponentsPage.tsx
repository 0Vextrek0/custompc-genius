
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { components, componentTypes, Component } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Plus, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const ComponentsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredComponents, setFilteredComponents] = useState<Component[]>(components);
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  useEffect(() => {
    let filtered = components;

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((component) => component.type === selectedType);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (component) =>
          component.name.toLowerCase().includes(query) ||
          component.brand.toLowerCase().includes(query) ||
          component.description.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (component) => component.price >= priceRange[0] && component.price <= priceRange[1]
    );

    setFilteredComponents(filtered);
  }, [searchQuery, selectedType, priceRange]);

  const handleAddToConfig = (component: Component) => {
    toast({
      title: "Component Added",
      description: `${component.name} has been added to your configuration.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-2"
      >
        <h1 className="text-3xl font-bold">PC Components</h1>
        <p className="text-muted-foreground">
          Browse and search for computer components to build your perfect PC
        </p>
      </motion.div>

      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your component search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Component Type Filter */}
              <div className="space-y-2">
                <h3 className="font-medium">Component Type</h3>
                <div className="space-y-1">
                  <Button
                    variant={selectedType === "all" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedType("all")}
                  >
                    All Components
                  </Button>
                  {componentTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedType === type.id ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedType(type.id)}
                    >
                      {type.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Price Range</h3>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 2000]}
                  max={2000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>$2000+</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  setSelectedType("all");
                  setPriceRange([0, 2000]);
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Components List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search components..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.length > 0 ? (
              filteredComponents.map((component, index) => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover-scale">
                    <div className="aspect-video relative bg-muted">
                      <img
                        src={component.image}
                        alt={component.name}
                        className="object-contain w-full h-full p-4"
                      />
                      <Badge
                        className="absolute top-2 right-2"
                        variant="secondary"
                      >
                        {componentTypes.find((t) => t.id === component.type)?.name}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{component.name}</CardTitle>
                          <CardDescription>{component.brand}</CardDescription>
                        </div>
                        <span className="font-bold text-lg">${component.price}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{component.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {component.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedComponent(component)}>
                            <Info className="h-4 w-4 mr-1" /> Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          {selectedComponent && (
                            <div>
                              <DialogHeader>
                                <DialogTitle>{selectedComponent.name}</DialogTitle>
                                <DialogDescription>
                                  {selectedComponent.brand} - ${selectedComponent.price}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-center">
                                  <img
                                    src={selectedComponent.image}
                                    alt={selectedComponent.name}
                                    className="object-contain max-h-60"
                                  />
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="font-semibold text-lg">Description</h3>
                                    <p className="text-muted-foreground">
                                      {selectedComponent.description}
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-lg mb-2">Specifications</h3>
                                    <div className="space-y-2">
                                      {Object.entries(selectedComponent.specs).map(([key, value]) => (
                                        <div key={key} className="grid grid-cols-2 gap-2 border-b pb-1">
                                          <span className="text-sm font-medium capitalize">
                                            {key.replace(/([A-Z])/g, " $1").trim()}
                                          </span>
                                          <span className="text-sm text-muted-foreground">{value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" onClick={() => handleAddToConfig(component)}>
                        <Plus className="h-4 w-4 mr-1" /> Add to Build
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No components found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComponentsPage;
