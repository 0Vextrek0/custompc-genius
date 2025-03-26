
import { useState } from "react";
import { motion } from "framer-motion";
import { pcBuilds, componentTypes } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronRight, Copy, Cpu, Download, Eye, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BuildsPage = () => {
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [purpose, setPurpose] = useState("all");
  const [filteredBuilds, setFilteredBuilds] = useState(pcBuilds);
  const [selectedBuild, setSelectedBuild] = useState(pcBuilds[0]);

  // Filter builds based on criteria
  const filterBuilds = () => {
    let filtered = pcBuilds;
    
    // Filter by price
    filtered = filtered.filter(
      (build) => build.price >= priceRange[0] && build.price <= priceRange[1]
    );
    
    // Filter by purpose
    if (purpose !== "all") {
      filtered = filtered.filter((build) => build.purpose.includes(purpose));
    }
    
    setFilteredBuilds(filtered);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-2"
      >
        <h1 className="text-3xl font-bold">Recommended PC Builds</h1>
        <p className="text-muted-foreground">
          Browse our curated collection of PC builds for different needs and budgets
        </p>
      </motion.div>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your PC build search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Purpose</h3>
                  <RadioGroup
                    value={purpose}
                    onValueChange={setPurpose}
                    className="space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All Purposes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gaming" id="gaming" />
                      <Label htmlFor="gaming">Gaming</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="content creation" id="content" />
                      <Label htmlFor="content">Content Creation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="work" id="work" />
                      <Label htmlFor="work">Work / Office</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="streaming" id="streaming" />
                      <Label htmlFor="streaming">Streaming</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <span className="text-xs text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 4000]}
                    min={0}
                    max={4000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground pt-1">
                    <span>$0</span>
                    <span>$4000+</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setPurpose("all");
                  setPriceRange([0, 4000]);
                  setFilteredBuilds(pcBuilds);
                }}
              >
                Reset
              </Button>
              <Button onClick={filterBuilds}>Apply Filters</Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Builds List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Available Builds</h2>
                <p className="text-sm text-muted-foreground">
                  {filteredBuilds.length} builds found
                </p>
              </div>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuilds.map((build, index) => (
                  <motion.div
                    key={build.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover-scale">
                      <div className="aspect-video relative">
                        <img
                          src={build.image}
                          alt={build.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <Badge className="mb-2">{build.category}</Badge>
                          <h3 className="text-lg font-semibold text-white">{build.name}</h3>
                          <div className="flex items-center text-white/90 mt-1 text-sm">
                            <span>${build.price.toLocaleString()}</span>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                              {build.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="py-4">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {build.purpose.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {build.description}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedBuild(build)}>
                              <Eye className="h-4 w-4 mr-1" /> View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{selectedBuild.name}</DialogTitle>
                              <DialogDescription>
                                {selectedBuild.description}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 mt-6">
                              <div className="space-y-4">
                                <div className="relative rounded-lg overflow-hidden">
                                  <img
                                    src={selectedBuild.image}
                                    alt={selectedBuild.name}
                                    className="w-full aspect-video object-cover"
                                  />
                                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <Badge className="mb-2">{selectedBuild.category}</Badge>
                                    <div className="text-white">
                                      <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">{selectedBuild.name}</h3>
                                        <div className="flex items-center">
                                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                                          <span>{selectedBuild.rating}</span>
                                        </div>
                                      </div>
                                      <p className="mt-1 text-sm text-white/80">
                                        Total: ${selectedBuild.price.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {selectedBuild.purpose.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="flex gap-2">
                                  <Button className="flex-1">
                                    <Copy className="h-4 w-4 mr-2" /> Clone Build
                                  </Button>
                                  <Button variant="outline" className="flex-1">
                                    <Download className="h-4 w-4 mr-2" /> Download
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Components</h3>
                                <div className="space-y-2">
                                  {componentTypes.map((type) => {
                                    const component = selectedBuild.components.find(
                                      (c) => c.type === type.id
                                    );
                                    return (
                                      <div key={type.id} className="bg-muted/30 rounded-lg p-3">
                                        <div className="text-sm text-muted-foreground mb-1">
                                          {type.name}
                                        </div>
                                        {component ? (
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                              <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                                                <img
                                                  src={component.image}
                                                  alt={component.name}
                                                  className="w-6 h-6 object-contain"
                                                />
                                              </div>
                                              <div>
                                                <div className="font-medium text-sm">
                                                  {component.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                  {component.brand}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="text-sm font-medium">
                                              ${component.price}
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="text-sm italic text-muted-foreground">
                                            Not included
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button size="sm">
                          Configure <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {filteredBuilds.map((build, index) => (
                  <motion.div
                    key={build.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="hover-scale">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 aspect-video">
                          <img
                            src={build.image}
                            alt={build.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">{build.name}</h3>
                                <Badge>{build.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {build.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {build.purpose.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                {build.components.slice(0, 3).map((component) => (
                                  <div
                                    key={component.id}
                                    className="flex items-center space-x-2 text-xs"
                                  >
                                    <Check className="h-3 w-3 text-green-500" />
                                    <span className="truncate">{component.name}</span>
                                  </div>
                                ))}
                                {build.components.length > 3 && (
                                  <div className="text-xs text-muted-foreground">
                                    +{build.components.length - 3} more
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div>
                                <div className="flex items-center text-sm">
                                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                                  {build.rating}
                                </div>
                                <div className="font-bold">${build.price.toLocaleString()}</div>
                              </div>
                              <div className="flex space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" onClick={() => setSelectedBuild(build)}>
                                      Details
                                    </Button>
                                  </DialogTrigger>
                                </Dialog>
                                <Button size="sm">Configure</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default BuildsPage;
