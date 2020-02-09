Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/bionic64"

  config.vm.network "forwarded_port", guest: 80, host: 80
  config.vm.network "forwarded_port", guest: 3306, host: 3306

  config.vm.synced_folder "./webapp", "/home/vagrant/webapp"
  config.vm.synced_folder "./bench", "/home/vagrant/bench"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

end
