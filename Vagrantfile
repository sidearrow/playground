Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/bionic64"

  config.vm.network "forwarded_port", guest: 80, host: 80

  config.vm.synced_folder "./webapp", "/home/vagrant/webapp"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

end
